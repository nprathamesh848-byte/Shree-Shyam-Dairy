import { s as inr, t as BUSINESS } from "./business-U2QbWJX3.mjs";
import { a as stringType, i as objectType, n as literalType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { a as TSS_SERVER_FUNCTION, i as getRequestHeader, o as createServerFn } from "./server-BjfBiuCY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-C1jCc6NG.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function resolveUserId(authHeader, admin) {
	if (!authHeader?.startsWith("Bearer ")) return null;
	const token = authHeader.slice(7);
	const { data } = await admin.auth.getUser(token);
	return data.user?.id ?? null;
}
async function getDeliverySettings(admin) {
	const { data } = await admin.from("settings").select("value").eq("key", "delivery").maybeSingle();
	const v = data?.value ?? {};
	return {
		deliveryCharge: Number(v["delivery_charge"] ?? 30),
		freeThreshold: Number(v["free_delivery_threshold"] ?? 500),
		minimumOrder: Number(v["minimum_order"] ?? 0)
	};
}
function round2(n) {
	return Math.round(n * 100) / 100;
}
async function computeCoupon(admin, code, subtotal) {
	if (!code) return {
		discount: 0,
		code: null
	};
	const { data } = await admin.from("coupons").select("*").eq("code", code.trim().toUpperCase()).maybeSingle();
	if (!data || !data.status) return {
		discount: 0,
		code: null,
		error: "This coupon code is not valid."
	};
	if (data.expiry_date && new Date(data.expiry_date) < /* @__PURE__ */ new Date()) return {
		discount: 0,
		code: null,
		error: "This coupon has expired."
	};
	if (data.usage_limit != null && data.used_count >= data.usage_limit) return {
		discount: 0,
		code: null,
		error: "This coupon is no longer available."
	};
	if (subtotal < Number(data.minimum_order)) return {
		discount: 0,
		code: null,
		error: `Add items worth ${inr(Number(data.minimum_order) - subtotal)} more to use this coupon.`
	};
	let discount = data.discount_type === "percentage" ? subtotal * Number(data.discount_value) / 100 : Number(data.discount_value);
	if (data.maximum_discount != null) discount = Math.min(discount, Number(data.maximum_discount));
	return {
		discount: round2(Math.min(discount, subtotal)),
		code: data.code
	};
}
function buildOrderEmailHtml(order) {
	const rows = order.items.map((i) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.product_name}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.variant_label}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${i.quantity}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${inr(i.price)}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${inr(i.subtotal)}</td></tr>`).join("");
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
async function sendOrderEmail(subject, html) {
	const apiKey = process.env["RESEND_API_KEY"];
	if (!apiKey) return false;
	const from = process.env["RESEND_FROM"] ?? "Shree Shyam Dairy <onboarding@resend.dev>";
	try {
		return (await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from,
				to: [process.env["ADMIN_EMAIL"] ?? BUSINESS.email],
				subject,
				html
			})
		})).ok;
	} catch {
		return false;
	}
}
var placeOrderSchema = objectType({
	items: arrayType(objectType({
		variantId: stringType().uuid(),
		quantity: numberType().int().min(1).max(50)
	})).min(1).max(50),
	customer: objectType({
		name: stringType().trim().min(2).max(80),
		mobile: stringType().trim().regex(/^[6-9]\d{9}$/),
		address: stringType().trim().min(5).max(400),
		landmark: stringType().trim().max(120).optional().or(literalType("")),
		city: stringType().trim().min(2).max(80),
		pincode: stringType().trim().regex(/^\d{6}$/),
		instructions: stringType().trim().max(300).optional().or(literalType(""))
	}),
	couponCode: stringType().trim().max(30).optional().or(literalType(""))
});
var validateCoupon_createServerFn_handler = createServerRpc({
	id: "59d1d095cafaabc189e89c8516cd35801bb0a15fb2f4d6f729b2d2e3fae8629a",
	name: "validateCoupon",
	filename: "src/lib/orders.functions.ts"
}, (opts) => validateCoupon.__executeServer(opts));
var validateCoupon = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	code: stringType().trim().min(1).max(30),
	subtotal: numberType().min(0)
}).parse(d)).handler(validateCoupon_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-DV608Anp.mjs");
	const result = await computeCoupon(supabaseAdmin, data.code, data.subtotal);
	return {
		discount: result.discount,
		code: result.code,
		error: result.error ?? null
	};
});
var placeOrder_createServerFn_handler = createServerRpc({
	id: "a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a",
	name: "placeOrder",
	filename: "src/lib/orders.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).inputValidator((d) => placeOrderSchema.parse(d)).handler(placeOrder_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-DV608Anp.mjs");
	const userId = await resolveUserId(getRequestHeader("Authorization"), supabaseAdmin);
	const variantIds = data.items.map((i) => i.variantId);
	const { data: variants, error: variantError } = await supabaseAdmin.from("product_variants").select("id, product_id, label, price, stock, status, products(id, name, status)").in("id", variantIds);
	if (variantError) throw new Error("Unable to place order. Please try again.");
	const orderItems = [];
	for (const line of data.items) {
		const v = variants?.find((x) => x.id === line.variantId);
		const product = v?.products;
		if (!v || !v.status || !product || !product.status) throw new Error("Some products are no longer available.");
		if (v.stock < line.quantity) throw new Error("Some products are no longer available in the requested quantity.");
		const price = Number(v.price);
		orderItems.push({
			product_id: product.id,
			variant_id: v.id,
			product_name: product.name,
			variant_label: v.label,
			quantity: line.quantity,
			price,
			subtotal: round2(price * line.quantity)
		});
	}
	const subtotal = round2(orderItems.reduce((s, i) => s + i.subtotal, 0));
	const settings = await getDeliverySettings(supabaseAdmin);
	if (subtotal < settings.minimumOrder) throw new Error(`Minimum order value is ₹${settings.minimumOrder}.`);
	const coupon = await computeCoupon(supabaseAdmin, data.couponCode || void 0, subtotal);
	const discount = coupon.discount;
	const afterDiscount = round2(subtotal - discount);
	const deliveryCharge = afterDiscount >= settings.freeThreshold ? 0 : settings.deliveryCharge;
	const total = round2(afterDiscount + deliveryCharge);
	const { data: orderNumber, error: numberError } = await supabaseAdmin.rpc("next_order_number");
	if (numberError || !orderNumber) throw new Error("Unable to place order. Please try again.");
	const { data: order, error: orderError } = await supabaseAdmin.from("orders").insert({
		order_number: orderNumber,
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
		status_history: [{
			status: "pending",
			at: (/* @__PURE__ */ new Date()).toISOString()
		}]
	}).select("*").single();
	if (orderError || !order) throw new Error("Unable to place order. Please try again.");
	const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItems.map((i) => ({
		...i,
		order_id: order.id
	})));
	if (itemsError) {
		await supabaseAdmin.from("orders").delete().eq("id", order.id);
		throw new Error("Unable to place order. Please try again.");
	}
	for (const item of orderItems) {
		const v = variants?.find((x) => x.id === item.variant_id);
		await supabaseAdmin.from("product_variants").update({ stock: Math.max((v?.stock ?? 0) - item.quantity, 0) }).eq("id", item.variant_id);
	}
	if (coupon.code) {
		const { data: c } = await supabaseAdmin.from("coupons").select("used_count").eq("code", coupon.code).maybeSingle();
		await supabaseAdmin.from("coupons").update({ used_count: (c?.used_count ?? 0) + 1 }).eq("code", coupon.code);
	}
	if (userId) await supabaseAdmin.from("notifications").insert({
		user_id: userId,
		title: "Order placed",
		message: `Your order ${order.order_number} has been received and is pending confirmation.`,
		type: "order"
	});
	const emailSent = await sendOrderEmail(`New Order Received — Order #${order.order_number}`, buildOrderEmailHtml({
		order_number: order.order_number,
		customer_name: order.customer_name,
		customer_mobile: order.customer_mobile,
		address_text: order.address_text,
		landmark: order.landmark,
		city: order.city,
		pincode: order.pincode,
		subtotal,
		discount,
		delivery_charge: deliveryCharge,
		total,
		created_at: order.created_at,
		items: orderItems
	}));
	if (emailSent) await supabaseAdmin.from("orders").update({ email_sent: true }).eq("id", order.id);
	return {
		order: {
			...order,
			subtotal,
			discount,
			delivery_charge: deliveryCharge,
			total,
			email_sent: emailSent
		},
		items: orderItems
	};
});
var markWhatsAppSent_createServerFn_handler = createServerRpc({
	id: "11f995a8bfc43eee2f810f00bfc4a898b23bf6eadf646160b1be4d5b1baf9928",
	name: "markWhatsAppSent",
	filename: "src/lib/orders.functions.ts"
}, (opts) => markWhatsAppSent.__executeServer(opts));
var markWhatsAppSent = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ orderNumber: stringType().trim().min(3).max(40) }).parse(d)).handler(markWhatsAppSent_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-DV608Anp.mjs");
	await supabaseAdmin.from("orders").update({ whatsapp_sent: true }).eq("order_number", data.orderNumber);
	return { ok: true };
});
var getOrderByNumber_createServerFn_handler = createServerRpc({
	id: "f3cad7f3bb15e3a2eb2560c545d20daf509d00d9eaea6979b3e91e0a4fe248d4",
	name: "getOrderByNumber",
	filename: "src/lib/orders.functions.ts"
}, (opts) => getOrderByNumber.__executeServer(opts));
var getOrderByNumber = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ orderNumber: stringType().trim().min(3).max(40) }).parse(d)).handler(getOrderByNumber_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-DV608Anp.mjs");
	const { data: order } = await supabaseAdmin.from("orders").select("*, order_items(*)").eq("order_number", data.orderNumber).maybeSingle();
	return order ?? null;
});
var claimAdminRole_createServerFn_handler = createServerRpc({
	id: "cf5769294b4a5130952775a0b61021c833692841181fa9ccd8fc50e289e05fb1",
	name: "claimAdminRole",
	filename: "src/lib/orders.functions.ts"
}, (opts) => claimAdminRole.__executeServer(opts));
var claimAdminRole = createServerFn({ method: "POST" }).handler(claimAdminRole_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-DV608Anp.mjs");
	const userId = await resolveUserId(getRequestHeader("Authorization"), supabaseAdmin);
	if (!userId) return { granted: false };
	const { data: user } = await supabaseAdmin.auth.admin.getUserById(userId);
	const adminEmail = (process.env["ADMIN_EMAIL"] ?? "kunalchavan9503@gmail.com").toLowerCase();
	if (!user.user?.email || user.user.email.toLowerCase() !== adminEmail) return { granted: false };
	await supabaseAdmin.from("user_roles").upsert({
		user_id: userId,
		role: "admin"
	}, { onConflict: "user_id,role" });
	return { granted: true };
});
//#endregion
export { claimAdminRole_createServerFn_handler, getOrderByNumber_createServerFn_handler, markWhatsAppSent_createServerFn_handler, placeOrder_createServerFn_handler, validateCoupon_createServerFn_handler };
