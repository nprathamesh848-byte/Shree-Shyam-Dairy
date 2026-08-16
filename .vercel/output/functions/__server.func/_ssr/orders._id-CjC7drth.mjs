import { t as supabase } from "./client-C9b7jjpj.mjs";
import { a as Package, d as cn, t as Button } from "./logo-DKea5PPW.mjs";
import { M as require_jsx_runtime } from "./server-DVY_7xHe.mjs";
import { i as Route$4, w as Link } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { a as buildWhatsAppUrl, i as buildWhatsAppMessage, n as ORDER_STATUSES, r as STATUS_LABELS, s as inr, t as BUSINESS } from "./business-U2QbWJX3.mjs";
import { t as LoaderCircle } from "./loader-circle-zQe4l_QO.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { n as Check } from "./dist-D_bSMhYx.mjs";
import { a as MessageCircle, n as CustomerLayout } from "./CustomerLayout-BzHiSlH4.mjs";
import { t as EmptyState } from "./EmptyState-DO_ROLMb.mjs";
import { t as Separator } from "./separator-d9uBYV-e.mjs";
import { t as RequireAuth } from "./RequireAuth-CesbTmf8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-CjC7drth.js
var import_jsx_runtime = require_jsx_runtime();
function OrderDetail() {
	const { id } = Route$4.useParams();
	const { data: order, isLoading } = useQuery({
		queryKey: ["order", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[40vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" })
	});
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-2xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Package,
			title: "Order not found",
			description: "We couldn't find this order in your account.",
			actionLabel: "My Orders",
			actionTo: "/orders"
		})
	});
	const history = order.status_history ?? [];
	const cancelled = order.order_status === "cancelled";
	const currentIndex = ORDER_STATUSES.indexOf(order.order_status);
	const waMessage = buildWhatsAppMessage({
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
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/orders",
				className: "text-sm text-primary",
				children: "← Back to my orders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-bold",
					children: order.order_number
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: ["Placed on ", new Date(order.created_at).toLocaleString("en-IN")]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: cancelled ? "destructive" : "secondary",
					className: "rounded-full",
					children: STATUS_LABELS[order.order_status] ?? order.order_status
				})]
			}),
			!cancelled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-5 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Order tracking"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-4",
					children: ORDER_STATUSES.map((s, i) => {
						const done = i <= currentIndex;
						const at = history.find((h) => h.status === s)?.at;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px]", done ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"),
								children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-sm font-medium", !done && "text-muted-foreground"),
								children: s === "pending" ? "Order Placed" : STATUS_LABELS[s]
							}), at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: new Date(at).toLocaleString("en-IN")
							})] })]
						}, s);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Items"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: (order.order_items ?? []).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								i.product_name,
								" · ",
								i.variant_label,
								" × ",
								i.quantity
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: inr(i.subtotal)
							})]
						}, i.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "space-y-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Subtotal",
								value: inr(order.subtotal)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Discount",
								value: `-${inr(order.discount)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Delivery charge",
								value: inr(order.delivery_charge)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Total",
								value: inr(order.total),
								bold: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Payment",
								value: "Cash on Delivery"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-5 p-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Delivery address"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [
							order.customer_name,
							" · ",
							order.customer_mobile
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							order.address_text,
							order.landmark ? `, ${order.landmark}` : "",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							order.city,
							" - ",
							order.pincode
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "mt-5 rounded-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: buildWhatsAppUrl(waMessage),
					target: "_blank",
					rel: "noopener noreferrer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-4 w-4" }),
						" Contact Us on WhatsApp (",
						BUSINESS.phone,
						")"
					]
				})
			})
		]
	});
}
function Row({ label, value, bold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex justify-between", bold && "text-base font-bold"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: bold ? "" : "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDetail, {}) }) });
//#endregion
export { SplitComponent as component };
