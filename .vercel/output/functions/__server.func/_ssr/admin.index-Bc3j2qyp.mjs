import { t as supabase } from "./client-C9b7jjpj.mjs";
import { a as Package, m as createLucideIcon } from "./logo-DKea5PPW.mjs";
import { M as require_jsx_runtime } from "./server-DVY_7xHe.mjs";
import { w as Link } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { r as STATUS_LABELS, s as inr } from "./business-U2QbWJX3.mjs";
import { n as AdminPageHeader, r as Users, t as AdminLayout } from "./AdminLayout-BjGG6hzA.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { t as Skeleton } from "./skeleton-C5JQaj4b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Bc3j2qyp.js
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var IndianRupee = createLucideIcon("indian-rupee", [
	["path", {
		d: "M6 3h12",
		key: "ggurg9"
	}],
	["path", {
		d: "M6 8h12",
		key: "6g4wlu"
	}],
	["path", {
		d: "m6 13 8.5 8",
		key: "u1kupk"
	}],
	["path", {
		d: "M6 13h3",
		key: "wdp6ag"
	}],
	["path", {
		d: "M9 13c6.667 0 6.667-10 0-10",
		key: "1nkvk2"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShoppingBag = createLucideIcon("shopping-bag", [
	["path", {
		d: "M16 10a4 4 0 0 1-8 0",
		key: "1ltviw"
	}],
	["path", {
		d: "M3.103 6.034h17.794",
		key: "awc11p"
	}],
	["path", {
		d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
		key: "o988cm"
	}]
]);
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
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
