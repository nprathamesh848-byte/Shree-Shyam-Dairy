import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./logo-BmbwPOq5.mjs";
import { a as buildWhatsAppUrl, i as buildWhatsAppMessage, s as inr, t as BUSINESS } from "./business-U2QbWJX3.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as MessageCircle, N as LoaderCircle, W as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-BABXZNCw.mjs";
import { i as useServerFn, n as markWhatsAppSent, t as getOrderByNumber } from "./orders.functions-BP6ONnQr.mjs";
import { a as Route } from "./router-BvFi0Otd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-success._orderNumber-DJTdgDYt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderSuccess() {
	const { orderNumber } = Route.useParams();
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
