import { BUSINESS, inr } from "./business";

export type PlaceOrderInput = {
  items: Array<{ variantId: string; quantity: number }>;
  customer: {
    name: string;
    mobile: string;
    address: string;
    landmark?: string;
    city: string;
    pincode: string;
    instructions?: string;
  };
  couponCode?: string;
};

type Admin = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

export async function resolveUserId(authHeader: string | undefined, admin: Admin) {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const { data } = await admin.auth.getUser(token);
  return data.user?.id ?? null;
}

export async function getDeliverySettings(admin: Admin) {
  const { data } = await admin.from("settings").select("value").eq("key", "delivery").maybeSingle();
  const v = (data?.value ?? {}) as Record<string, unknown>;
  return {
    deliveryCharge: Number(v["delivery_charge"] ?? 30),
    freeThreshold: Number(v["free_delivery_threshold"] ?? 500),
    minimumOrder: Number(v["minimum_order"] ?? 0),
  };
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export async function computeCoupon(
  admin: Admin,
  code: string | undefined,
  subtotal: number,
): Promise<{ discount: number; code: string | null; error?: string }> {
  if (!code) return { discount: 0, code: null };
  const { data } = await admin
    .from("coupons")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .maybeSingle();
  if (!data || !data.status)
    return { discount: 0, code: null, error: "This coupon code is not valid." };
  if (data.expiry_date && new Date(data.expiry_date) < new Date())
    return { discount: 0, code: null, error: "This coupon has expired." };
  if (data.usage_limit != null && data.used_count >= data.usage_limit)
    return { discount: 0, code: null, error: "This coupon is no longer available." };
  if (subtotal < Number(data.minimum_order))
    return {
      discount: 0,
      code: null,
      error: `Add items worth ${inr(Number(data.minimum_order) - subtotal)} more to use this coupon.`,
    };

  let discount =
    data.discount_type === "percentage"
      ? (subtotal * Number(data.discount_value)) / 100
      : Number(data.discount_value);
  if (data.maximum_discount != null) discount = Math.min(discount, Number(data.maximum_discount));
  return { discount: round2(Math.min(discount, subtotal)), code: data.code };
}

export function buildOrderEmailHtml(order: {
  order_number: string;
  customer_name: string;
  customer_mobile: string;
  address_text: string;
  landmark?: string | null;
  city?: string | null;
  pincode?: string | null;
  subtotal: number;
  discount: number;
  delivery_charge: number;
  total: number;
  created_at: string;
  items: Array<{
    product_name: string;
    variant_label: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
}) {
  const rows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.product_name}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.variant_label}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.quantity}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${inr(i.price)}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${inr(i.subtotal)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;color:#1b2b23">
  <h2>New Order Received — ${order.order_number}</h2>
  <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString("en-IN")}</p>
  <h3>Customer</h3>
  <p>${order.customer_name}<br/>${order.customer_mobile}</p>
  <h3>Delivery Address</h3>
  <p>${order.address_text}${order.landmark ? `<br/>Landmark: ${order.landmark}` : ""}<br/>${order.city ?? ""} - ${order.pincode ?? ""}</p>
  <h3>Items</h3>
  <table style="border-collapse:collapse;width:100%"><thead><tr><th align="left">Product</th><th align="left">Variant</th><th align="left">Qty</th><th align="left">Price</th><th align="left">Subtotal</th></tr></thead><tbody>${rows}</tbody></table>
  <p><strong>Subtotal:</strong> ${inr(order.subtotal)}<br/>
  <strong>Discount:</strong> ${inr(order.discount)}<br/>
  <strong>Delivery Charge:</strong> ${inr(order.delivery_charge)}<br/>
  <strong>Total:</strong> ${inr(order.total)}</p>
  <p><strong>Payment Method:</strong> Cash on Delivery</p>
  <p>— ${BUSINESS.name}</p>
</div>`;
}

export async function sendOrderEmail(subject: string, html: string): Promise<boolean> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return false;
  const from = process.env["RESEND_FROM"] ?? "Shree Shyam Dairy <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env["ADMIN_EMAIL"] ?? BUSINESS.email],
        subject,
        html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
