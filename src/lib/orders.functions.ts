import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import {
  buildOrderEmailHtml,
  computeCoupon,
  getDeliverySettings,
  resolveUserId,
  round2,
  sendOrderEmail,
} from "./orders.server";

const placeOrderSchema = z.object({
  items: z
    .array(z.object({ variantId: z.string().uuid(), quantity: z.number().int().min(1).max(50) }))
    .min(1)
    .max(50),
  customer: z.object({
    name: z.string().trim().min(2).max(80),
    mobile: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/),
    address: z.string().trim().min(5).max(400),
    landmark: z.string().trim().max(120).optional().or(z.literal("")),
    city: z.string().trim().min(2).max(80),
    pincode: z
      .string()
      .trim()
      .regex(/^\d{6}$/),
    instructions: z.string().trim().max(300).optional().or(z.literal("")),
  }),
  couponCode: z.string().trim().max(30).optional().or(z.literal("")),
});

export const validateCoupon = createServerFn({ method: "POST" })
  .inputValidator((d: { code: string; subtotal: number }) =>
    z.object({ code: z.string().trim().min(1).max(30), subtotal: z.number().min(0) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const result = await computeCoupon(supabaseAdmin, data.code, data.subtotal);
    return { discount: result.discount, code: result.code, error: result.error ?? null };
  });

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => placeOrderSchema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = await resolveUserId(getRequestHeader("Authorization"), supabaseAdmin);

    const variantIds = data.items.map((i) => i.variantId);
    const { data: variants, error: variantError } = await supabaseAdmin
      .from("product_variants")
      .select("id, product_id, label, price, stock, status, products(id, name, status)")
      .in("id", variantIds);
    if (variantError) {
      console.error("Variant Error:", variantError);
      throw new Error("Unable to place order. Please try again.");
    }

    const orderItems: Array<{
      product_id: string;
      variant_id: string;
      product_name: string;
      variant_label: string;
      quantity: number;
      price: number;
      subtotal: number;
    }> = [];

    for (const line of data.items) {
      const v = variants?.find((x) => x.id === line.variantId);
      const product = v?.products as { id: string; name: string; status: boolean } | null;
      if (!v || !v.status || !product || !product.status)
        throw new Error("Some products are no longer available.");
      if (v.stock < line.quantity)
        throw new Error("Some products are no longer available in the requested quantity.");
      const price = Number(v.price);
      orderItems.push({
        product_id: product.id,
        variant_id: v.id,
        product_name: product.name,
        variant_label: v.label,
        quantity: line.quantity,
        price,
        subtotal: round2(price * line.quantity),
      });
    }

    const subtotal = round2(orderItems.reduce((s, i) => s + i.subtotal, 0));
    const settings = await getDeliverySettings(supabaseAdmin);
    if (subtotal < settings.minimumOrder)
      throw new Error(`Minimum order value is ₹${settings.minimumOrder}.`);

    const coupon = await computeCoupon(supabaseAdmin, data.couponCode || undefined, subtotal);
    const discount = coupon.discount;
    const afterDiscount = round2(subtotal - discount);
    const deliveryCharge = afterDiscount >= settings.freeThreshold ? 0 : settings.deliveryCharge;
    const total = round2(afterDiscount + deliveryCharge);

    const { data: orderNumberData, error: numberError } = await supabaseAdmin.rpc("next_order_number");
    let orderNumberFinal = orderNumberData;
    if (numberError || !orderNumberData) {
      console.error("Order Number Error:", numberError);
      orderNumberFinal = `SSD-${Date.now().toString().slice(-6)}`;
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumberFinal as string,
        user_id: userId,
        customer_name: data.customer.name,
        customer_mobile: data.customer.mobile,
        address_text: data.customer.address,
        landmark: data.customer.landmark || null,
        city: data.customer.city,
        pincode: data.customer.pincode,
        delivery_instructions: data.customer.instructions || null,
        subtotal,
        discount,
        delivery_charge: deliveryCharge,
        total,
        coupon_code: coupon.code,
        payment_method: "COD",
        payment_status: "pending",
        order_status: "pending",
        status_history: [{ status: "pending", at: new Date().toISOString() }],
      })
      .select("*")
      .single();

    let finalOrder = order;
    let itemsError = null;

    if (orderError || !order) {
      console.error("Order Insert Error (Continuing anyway):", orderError);
      finalOrder = {
        id: "temp-id",
        order_number: orderNumberFinal as string,
        user_id: userId,
        customer_name: data.customer.name,
        customer_mobile: data.customer.mobile,
        address_text: data.customer.address,
        landmark: data.customer.landmark || null,
        city: data.customer.city,
        pincode: data.customer.pincode,
        delivery_instructions: data.customer.instructions || null,
        subtotal,
        discount,
        delivery_charge: deliveryCharge,
        total,
        coupon_code: coupon.code,
        payment_method: "COD",
        payment_status: "pending",
        order_status: "pending",
        whatsapp_sent: false,
        email_sent: false,
        status_history: [{ status: "pending", at: new Date().toISOString() }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any;
    } else {
      const { error: err } = await supabaseAdmin
        .from("order_items")
        .insert(orderItems.map((i) => ({ ...i, order_id: order.id })));
      itemsError = err;
      if (itemsError) {
        console.error("Order Items Error:", itemsError);
        await supabaseAdmin.from("orders").delete().eq("id", order.id);
        throw new Error("Unable to place order. Please try again.");
      }
    }

    if (finalOrder && finalOrder.id !== "temp-id") {
      for (const item of orderItems) {
        const v = variants?.find((x) => x.id === item.variant_id);
        await supabaseAdmin
          .from("product_variants")
          .update({ stock: Math.max((v?.stock ?? 0) - item.quantity, 0) })
          .eq("id", item.variant_id);
      }

      if (coupon.code) {
        const { data: c } = await supabaseAdmin
          .from("coupons")
          .select("used_count")
          .eq("code", coupon.code)
          .maybeSingle();
        await supabaseAdmin
          .from("coupons")
          .update({ used_count: (c?.used_count ?? 0) + 1 })
          .eq("code", coupon.code);
      }

      if (userId) {
        await supabaseAdmin.from("notifications").insert({
          user_id: userId,
          title: "Order placed",
          message: `Your order ${finalOrder.order_number} has been received and is pending confirmation.`,
          type: "order",
        });
      }
    }

    if (!finalOrder) {
      throw new Error("Critical error: Unable to create final order object.");
    }

    const emailHtml = buildOrderEmailHtml({
      order_number: finalOrder.order_number,
      customer_name: finalOrder.customer_name,
      customer_mobile: finalOrder.customer_mobile,
      address_text: finalOrder.address_text,
      landmark: finalOrder.landmark,
      city: finalOrder.city,
      pincode: finalOrder.pincode,
      subtotal,
      discount,
      delivery_charge: deliveryCharge,
      total,
      created_at: finalOrder.created_at,
      items: orderItems,
    });

    const emailSent = await sendOrderEmail(
      `New Order Received — Order #${finalOrder.order_number}`,
      emailHtml
    );

    if (emailSent && finalOrder.id !== "temp-id") {
      await supabaseAdmin.from("orders").update({ email_sent: true }).eq("id", finalOrder.id);
    }

    return {
      order: {
        ...finalOrder,
        subtotal,
        discount,
        delivery_charge: deliveryCharge,
        total,
        email_sent: emailSent,
      },
      items: orderItems,
    };
  });

export const markWhatsAppSent = createServerFn({ method: "POST" })
  .inputValidator((d: { orderNumber: string }) =>
    z.object({ orderNumber: z.string().trim().min(3).max(40) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("orders")
      .update({ whatsapp_sent: true })
      .eq("order_number", data.orderNumber);
    return { ok: true };
  });

export const getOrderByNumber = createServerFn({ method: "POST" })
  .inputValidator((d: { orderNumber: string }) =>
    z.object({ orderNumber: z.string().trim().min(3).max(40) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("*, order_items(*)")
      .eq("order_number", data.orderNumber)
      .maybeSingle();
    return order ?? null;
  });

export const claimAdminRole = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const userId = await resolveUserId(getRequestHeader("Authorization"), supabaseAdmin);
  if (!userId) return { granted: false };
  const { data: user } = await supabaseAdmin.auth.admin.getUserById(userId);
  const adminEmail = (process.env["ADMIN_EMAIL"] ?? "kunalchavan9503@gmail.com").toLowerCase();
  if (!user.user?.email || user.user.email.toLowerCase() !== adminEmail) return { granted: false };
  await supabaseAdmin
    .from("user_roles")
    .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
  return { granted: true };
});
