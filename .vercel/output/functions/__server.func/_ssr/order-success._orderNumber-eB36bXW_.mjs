import { m as createLucideIcon, t as Button } from "./logo-DKea5PPW.mjs";
import { H as __toESM, M as require_jsx_runtime, N as require_react } from "./server-DVY_7xHe.mjs";
import { a as Route$6, w as Link } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { a as buildWhatsAppUrl, i as buildWhatsAppMessage, s as inr, t as BUSINESS } from "./business-U2QbWJX3.mjs";
import { t as LoaderCircle } from "./loader-circle-zQe4l_QO.mjs";
import { a as MessageCircle, n as CustomerLayout } from "./CustomerLayout-BzHiSlH4.mjs";
import { i as useServerFn, n as markWhatsAppSent, t as getOrderByNumber } from "./orders.functions-CAqn2IHl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-success._orderNumber-eB36bXW_.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleCheck = createLucideIcon("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderSuccess() {
	const { orderNumber } = Route$6.useParams();
	const fetchOrder = useServerFn(getOrderByNumber);
	const flagWhatsApp = useServerFn(markWhatsAppSent);
	const [whatsAppFailed, setWhatsAppFailed] = (0, import_react.useState)(false);
	const opened = (0, import_react.useRef)(false);
	const { data: order, isLoading } = useQuery({
		queryKey: ["order-success", orderNumber],
		queryFn: () => fetchOrder({ data: { orderNumber } })
	});
	const message = order ? buildWhatsAppMessage({
		order_number: order.order_number,
		customer_name: order.customer_name,
		customer_mobile: order.customer_mobile,
		address_text: order.address_text,
		landmark: order.landmark,
		city: order.city,
		pincode: order.pincode,
		subtotal: order.subtotal,
		discount: order.discount,
		delivery_charge: order.delivery_charge,
		total: order.total,
		items: (order.order_items ?? []).map((i) => ({
			product_name: i.product_name,
			variant_label: i.variant_label,
			quantity: i.quantity,
			price: i.price,
			subtotal: i.subtotal
		}))
	}) : "";
	(0, import_react.useEffect)(() => {
		if (!order || opened.current) return;
		opened.current = true;
		try {
			if (!window.open(buildWhatsAppUrl(message), "_blank", "noopener")) setWhatsAppFailed(true);
			else flagWhatsApp({ data: { orderNumber } });
		} catch {
			setWhatsAppFailed(true);
		}
	}, [
		order,
		message,
		orderNumber,
		flagWhatsApp
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" })
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-14 w-14 text-success" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-3xl font-bold",
				children: "Order Placed Successfully 🎉"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your order has been received."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-6 space-y-2 p-6 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Order ID"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xl font-bold",
						children: orderNumber
					}),
					order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-2 text-sm text-muted-foreground",
						children: "Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold",
						children: inr(order.total)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-2 text-sm text-muted-foreground",
						children: "Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Cash on Delivery"
					})
				]
			}),
			whatsAppFailed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border border-warning bg-warning/15 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: "Your order has been successfully created."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted-foreground",
					children: [
						"We couldn't open WhatsApp automatically. Your order is still saved. Contact us on",
						" ",
						BUSINESS.phone,
						"."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-sm text-muted-foreground",
				children: [
					"Please send the pre-filled WhatsApp message to confirm your order with ",
					BUSINESS.name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap justify-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: buildWhatsAppUrl(message),
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: () => void flagWhatsApp({ data: { orderNumber } }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-4 w-4" }), whatsAppFailed ? "Contact Us on WhatsApp" : "Open WhatsApp"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							children: "View My Order"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							children: "Continue Shopping"
						})
					})
				]
			})
		]
	}) });
}
//#endregion
export { OrderSuccess as component };
