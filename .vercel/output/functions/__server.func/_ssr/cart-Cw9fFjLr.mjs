import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Minus, f as ShoppingCart, o as Trash2, y as Plus } from "../_libs/lucide-react.mjs";
import { t as CustomerLayout } from "./CustomerLayout-CoFIWceo.mjs";
import { t as EmptyState } from "./EmptyState-zsqcacva.mjs";
import { t as Separator } from "./separator-fwwYpY1r.mjs";
import { n as deliverySettingsQuery } from "./queries-2vMK7IUA.mjs";
import { o as useCart } from "./router-gfFey6HA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Cw9fFjLr.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { items, subtotal, setQuantity, removeItem } = useCart();
	const { data: settings } = useQuery(deliverySettingsQuery);
	const deliveryCharge = settings && subtotal >= settings.freeThreshold ? 0 : settings?.deliveryCharge ?? 30;
	const total = subtotal + (items.length ? deliveryCharge : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "Your Cart"
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: ShoppingCart,
				title: "Cart Empty",
				description: "Your cart is waiting for some fresh goodness.",
				actionLabel: "Shop Products",
				actionTo: "/products"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface-card flex gap-3 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image ?? "",
						alt: item.productName,
						loading: "lazy",
						className: "h-20 w-20 shrink-0 rounded-xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold leading-tight",
									children: item.productName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: item.variantLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-medium",
									children: inr(item.price)
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "text-muted-foreground",
								onClick: () => removeItem(item.variantId),
								"aria-label": "Remove item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-full border border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "rounded-full",
										onClick: () => setQuantity(item.variantId, item.quantity - 1),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-8 text-center text-sm font-semibold",
										children: item.quantity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "rounded-full",
										onClick: () => setQuantity(item.variantId, Math.min(item.quantity + 1, item.stock)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: inr(item.price * item.quantity)
							})]
						})]
					})]
				}, item.variantId))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "surface-card h-fit p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(subtotal) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Discount"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Apply coupon at checkout" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Delivery charge"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: deliveryCharge === 0 ? "FREE" : inr(deliveryCharge) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-base font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(total) })]
							})
						]
					}),
					settings && subtotal < settings.freeThreshold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl bg-secondary p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium",
							children: [
								"Add ",
								inr(settings.freeThreshold - subtotal),
								" more to get FREE delivery 🚚"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-2 overflow-hidden rounded-full bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary transition-all duration-500",
								style: { width: `${Math.min(100, subtotal / settings.freeThreshold * 100)}%` }
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-2xl bg-secondary p-3 text-xs font-semibold text-primary",
						children: "🎉 Congratulations! You unlocked FREE delivery."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4 w-full rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							children: "Proceed to Checkout"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-2 w-full rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							children: "Continue Shopping"
						})
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { CartPage as component };
