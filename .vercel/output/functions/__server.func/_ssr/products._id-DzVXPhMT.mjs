import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as Minus, w as PackageSearch, y as Plus } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-ByWGWW5n.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-DAHqFqkY.mjs";
import { t as CustomerLayout } from "./CustomerLayout-CoFIWceo.mjs";
import { t as EmptyState } from "./EmptyState-zsqcacva.mjs";
import { c as productQuery } from "./queries-2vMK7IUA.mjs";
import { n as productImage } from "./product-images-Cq-6b_2J.mjs";
import { o as useCart, r as Route } from "./router-gfFey6HA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._id-DzVXPhMT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { addItem } = useCart();
	const { data: product, isLoading } = useQuery(productQuery(id));
	const [variantId, setVariantId] = (0, import_react.useState)(null);
	const [qty, setQty] = (0, import_react.useState)(1);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-square rounded-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-2/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-4/5" })
			]
		})]
	}) });
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: PackageSearch,
			title: "Product not found",
			description: "This product is no longer available.",
			actionLabel: "Shop Products",
			actionTo: "/products"
		})
	}) });
	const variants = product.product_variants;
	const variant = variants.find((v) => v.id === variantId) ?? variants[0];
	const price = Number(variant?.price ?? 0);
	const mrp = variant?.mrp ? Number(variant.mrp) : null;
	const off = mrp && mrp > price ? Math.round((mrp - price) / mrp * 100) : 0;
	const outOfStock = !variant || variant.stock <= 0;
	const add = () => {
		if (!variant) return;
		addItem({
			productId: product.id,
			variantId: variant.id,
			productName: product.name,
			variantLabel: variant.label,
			price,
			mrp,
			image: product.image || productImage(product.name),
			stock: variant.stock
		}, qty);
		toast.success("Product added to cart.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/products",
			className: "text-sm text-primary",
			children: "← Back to products"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-8 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image || productImage(product.name),
					alt: product.name,
					className: "aspect-square w-full object-cover",
					width: 800,
					height: 800
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				product.categories && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "rounded-full",
					children: product.categories.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-bold",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl font-bold",
						children: inr(price)
					}), mrp && mrp > price ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base text-muted-foreground line-through",
						children: inr(mrp)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "rounded-full bg-accent text-accent-foreground",
						children: [off, "% OFF"]
					})] }) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 text-sm font-semibold", outOfStock ? "text-destructive" : "text-success"),
					children: outOfStock ? "Out of stock" : `In stock (${variant.stock} available)`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Select variant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setVariantId(v.id),
							className: cn("rounded-full border px-4 py-2 text-sm font-medium", v.id === variant?.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"),
							children: [
								v.label,
								" — ",
								inr(v.price)
							]
						}, v.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						children: "Quantity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-full border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "rounded-full",
								onClick: () => setQty(Math.max(1, qty - 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 text-center text-sm font-semibold",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "rounded-full",
								onClick: () => setQty(Math.min(qty + 1, variant?.stock ?? 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full",
						disabled: outOfStock,
						onClick: add,
						children: "Add to Cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "rounded-full",
						disabled: outOfStock,
						onClick: () => {
							add();
							navigate({ to: "/checkout" });
						},
						children: "Buy Now"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 space-y-4 text-sm",
					children: [
						product.ingredients && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold",
							children: "Ingredients"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-muted-foreground",
							children: product.ingredients
						})] }),
						product.benefits && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold",
							children: "Benefits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-muted-foreground",
							children: product.benefits
						})] }),
						product.storage_instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold",
							children: "Storage instructions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-muted-foreground",
							children: product.storage_instructions
						})] })
					]
				})
			] })]
		})]
	}) });
}
//#endregion
export { ProductDetail as component };
