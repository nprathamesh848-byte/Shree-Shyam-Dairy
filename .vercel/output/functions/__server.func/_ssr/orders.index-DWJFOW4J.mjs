import { a as Package } from "./logo-DKea5PPW.mjs";
import { M as require_jsx_runtime } from "./server-DVY_7xHe.mjs";
import { w as Link } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { r as STATUS_LABELS, s as inr } from "./business-U2QbWJX3.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { t as Skeleton } from "./skeleton-C5JQaj4b.mjs";
import { a as myOrdersQuery } from "./queries-CUXl3ju3.mjs";
import { n as CustomerLayout } from "./CustomerLayout-BzHiSlH4.mjs";
import { t as EmptyState } from "./EmptyState-DO_ROLMb.mjs";
import { t as RequireAuth } from "./RequireAuth-CesbTmf8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.index-DWJFOW4J.js
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const { data, isLoading } = useQuery(myOrdersQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold",
			children: "My Orders"
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-3xl" }, i))
		}) : data && data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/orders/$id",
				params: { id: o.id },
				className: "surface-card block p-5 transition-shadow hover:shadow-[var(--shadow-lift)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-sm font-bold",
							children: o.order_number
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: new Date(o.created_at).toLocaleString("en-IN")
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "rounded-full",
							children: STATUS_LABELS[o.order_status] ?? o.order_status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-1 text-sm text-muted-foreground",
						children: (o.order_items ?? []).map((i) => `${i.product_name} (${i.variant_label}) × ${i.quantity}`).join(", ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Cash on Delivery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: inr(o.total)
						})]
					})
				]
			}) }, o.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Package,
				title: "No Orders",
				description: "You haven't placed any orders yet.",
				actionLabel: "Start Shopping",
				actionTo: "/products"
			})
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersPage, {}) }) });
//#endregion
export { SplitComponent as component };
