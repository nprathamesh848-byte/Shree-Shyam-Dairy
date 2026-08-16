import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as productImage } from "./product-images-Cq-6b_2J.mjs";
import { o as useCart } from "./router-gfFey6HA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-DRnYUitq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { addItem } = useCart();
	const variants = product.product_variants;
	const [variantId, setVariantId] = (0, import_react.useState)(variants[0]?.id ?? "");
	const [pickerOpen, setPickerOpen] = (0, import_react.useState)(false);
	const variant = variants.find((v) => v.id === variantId) ?? variants[0];
	const mrp = variant?.mrp ? Number(variant.mrp) : null;
	const price = Number(variant?.price ?? 0);
	const off = mrp && mrp > price ? Math.round((mrp - price) / mrp * 100) : 0;
	const outOfStock = !variant || variant.stock <= 0;
	const image = product.image || productImage(product.name);
	const add = () => {
		if (!variant) return;
		addItem({
			productId: product.id,
			variantId: variant.id,
			productName: product.name,
			variantLabel: variant.label,
			price: Number(variant.price),
			mrp: variant.mrp ? Number(variant.mrp) : null,
			image,
			stock: variant.stock
		});
		toast.success(`${product.name} added to cart`, { description: variant.label });
	};
	const onAddClick = () => {
		if (variants.length > 1 && !pickerOpen) {
			setPickerOpen(true);
			return;
		}
		setPickerOpen(false);
		add();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/products/$id",
			params: { id: product.id },
			className: "block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-square overflow-hidden bg-secondary/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: image,
						alt: product.name,
						loading: "lazy",
						onError: (e) => {
							e.currentTarget.src = productImage(product.name);
						},
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}),
					off > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground shadow-[var(--shadow-soft)]",
						children: [off, "% OFF"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-bold text-primary shadow-[var(--shadow-soft)]",
						children: "Fresh"
					}),
					outOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-destructive-foreground",
						children: "Sold out"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products/$id",
					params: { id: product.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold leading-tight",
						children: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: variant?.label
				}),
				pickerOpen && variants.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5 rounded-2xl bg-secondary/60 p-2",
					children: variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setVariantId(v.id),
						className: cn("rounded-full border px-2.5 py-1 text-xs font-medium transition-colors", v.id === variant?.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/50"),
						children: v.label
					}, v.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold",
						children: inr(price)
					}), mrp && mrp > price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground line-through",
						children: inr(mrp)
					}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						className: "h-11 w-11 rounded-full shadow-[var(--shadow-soft)] transition-transform hover:scale-105 active:scale-95",
						disabled: outOfStock,
						onClick: onAddClick,
						"aria-label": pickerOpen || variants.length === 1 ? `Add ${product.name} to cart` : `Choose size for ${product.name}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
