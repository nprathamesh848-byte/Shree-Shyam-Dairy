import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./logo-BmbwPOq5.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as Tag, x as Percent } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-BSf8tcxY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-Z3CvlVhe.mjs";
import { t as CustomerLayout } from "./CustomerLayout-BABXZNCw.mjs";
import { t as EmptyState } from "./EmptyState-BUdayDy-.mjs";
import { s as offersQuery } from "./queries-2vMK7IUA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers-CgmONKqh.js
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
