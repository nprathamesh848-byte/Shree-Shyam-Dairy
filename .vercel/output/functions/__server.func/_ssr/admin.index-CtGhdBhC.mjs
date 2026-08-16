import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as STATUS_LABELS, s as inr } from "./business-U2QbWJX3.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Package, L as IndianRupee, a as TriangleAlert, n as Users, p as ShoppingBag } from "../_libs/lucide-react.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-W2HguScW.mjs";
import { t as Badge } from "./badge-ByWGWW5n.mjs";
import { t as Skeleton } from "./skeleton-DAHqFqkY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CtGhdBhC.js
var import_jsx_runtime = require_jsx_runtime();
function startOfToday() {
	const d = /* @__PURE__ */ new Date();
	d.setHours(0, 0, 0, 0);
	return d.toISOString();
}
function Dashboard() {
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "dashboard"],
		queryFn: async () => {
			const [orders, products, customers, variants] = await Promise.all([
				supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(500),
				supabase.from("products").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("profiles").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("product_variants").select("*, products(name)").order("stock")
			]);
			const rows = orders.data ?? [];
			const today = startOfToday();
			const todays = rows.filter((o) => o.created_at >= today);
			const revenue = rows.filter((o) => o.order_status !== "cancelled").reduce((s, o) => s + Number(o.total), 0);
			const lowStock = (variants.data ?? []).filter((v) => Number(v.stock) <= Number(v.minimum_stock));
			return {
				todaysOrders: todays.length,
				todaysRevenue: todays.filter((o) => o.order_status !== "cancelled").reduce((s, o) => s + Number(o.total), 0),
				pending: rows.filter((o) => o.order_status === "pending").length,
				revenue,
				products: products.count ?? 0,
				customers: customers.count ?? 0,
				recent: rows.slice(0, 8),
				lowStock
			};
		}
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
		children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-2xl" }, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Dashboard",
			description: "Today at a glance"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Today's Orders",
					value: String(data.todaysOrders),
					icon: ShoppingBag
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Today's Revenue",
					value: inr(data.todaysRevenue),
					icon: IndianRupee
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Pending Orders",
					value: String(data.pending),
					icon: TriangleAlert
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total Revenue",
					value: inr(data.revenue),
					icon: IndianRupee
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Products",
					value: String(data.products),
					icon: Package
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Customers",
					value: String(data.customers),
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Low Stock Items",
					value: String(data.lowStock.length),
					icon: TriangleAlert
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Recent orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 divide-y text-sm",
					children: [data.recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/orders",
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium",
								children: o.order_number
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: o.customer_name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: inr(o.total)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "rounded-full text-[10px]",
								children: STATUS_LABELS[o.order_status] ?? o.order_status
							})]
						})]
					}, o.id)), data.recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-muted-foreground",
						children: "No orders yet."
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Low stock alerts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 divide-y text-sm",
					children: [data.lowStock.slice(0, 10).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 truncate",
							children: [
								v.products?.name,
								" · ",
								v.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "destructive",
							className: "rounded-full",
							children: [v.stock, " left"]
						})]
					}, v.id)), data.lowStock.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-muted-foreground",
						children: "All items are well stocked."
					})]
				})]
			})]
		})
	] });
}
function Stat({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-2xl font-bold",
			children: value
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) });
//#endregion
export { SplitComponent as component };
