import { m as createLucideIcon, o as Percent, t as Button } from "./logo-DKea5PPW.mjs";
import { M as require_jsx_runtime } from "./server-DVY_7xHe.mjs";
import { o as toast } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { t as Skeleton } from "./skeleton-C5JQaj4b.mjs";
import { s as offersQuery } from "./queries-CUXl3ju3.mjs";
import { n as CustomerLayout } from "./CustomerLayout-BzHiSlH4.mjs";
import { t as EmptyState } from "./EmptyState-DO_ROLMb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers-Cuj7AG97.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Tag = createLucideIcon("tag", [["path", {
	d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	key: "vktsd0"
}], ["circle", {
	cx: "7.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "kqv944"
}]]);
var import_jsx_runtime = require_jsx_runtime();
function OffersPage() {
	const { data, isLoading } = useQuery(offersQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Offers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Apply the coupon code at checkout to save."
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-3xl" }, i))
			}) : data && data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "surface-card flex flex-col gap-3 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-bold",
								children: o.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: o.description
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "rounded-full bg-accent text-accent-foreground",
								children: o.discount_type === "percentage" ? `${Number(o.discount_value)}% OFF` : `${inr(o.discount_value)} OFF`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-1 text-xs text-muted-foreground",
							children: [
								Number(o.minimum_order) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Minimum order ", inr(o.minimum_order)] }),
								o.maximum_discount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Maximum discount ", inr(o.maximum_discount)] }),
								o.end_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Valid till ", new Date(o.end_date).toLocaleDateString("en-IN")] }),
								o.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o.terms })
							]
						}),
						o.coupon_code && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-secondary/50 px-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 font-mono text-sm font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-4 w-4" }),
									" ",
									o.coupon_code
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "rounded-full",
								onClick: () => {
									navigator.clipboard?.writeText(o.coupon_code);
									toast.success("Coupon code copied.");
								},
								children: "Copy"
							})]
						})
					]
				}, o.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Percent,
					title: "No active offers",
					description: "No active offers available right now. Check back soon!",
					actionLabel: "Shop Products",
					actionTo: "/products"
				})
			})
		]
	}) });
}
//#endregion
export { OffersPage as component };
