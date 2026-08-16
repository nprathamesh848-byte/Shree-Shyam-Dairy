import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-W2HguScW.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Skeleton } from "./skeleton-DAHqFqkY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers-DlspHTcH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCustomers() {
	const [search, setSearch] = (0, import_react.useState)("");
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "customers"],
		queryFn: async () => {
			const [profiles, orders] = await Promise.all([supabase.from("profiles").select("*").order("created_at", { ascending: false }), supabase.from("orders").select("user_id,total,order_status,created_at")]);
			const byUser = /* @__PURE__ */ new Map();
			for (const o of orders.data ?? []) {
				if (!o.user_id) continue;
				const prev = byUser.get(o.user_id) ?? {
					count: 0,
					total: 0,
					last: o.created_at
				};
				byUser.set(o.user_id, {
					count: prev.count + 1,
					total: prev.total + (o.order_status === "cancelled" ? 0 : Number(o.total)),
					last: o.created_at > prev.last ? o.created_at : prev.last
				});
			}
			return (profiles.data ?? []).map((p) => ({
				...p,
				stats: byUser.get(p.id) ?? {
					count: 0,
					total: 0,
					last: ""
				}
			}));
		}
	});
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return (data ?? []).filter((c) => !q || (c.name ?? "").toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q) || (c.mobile ?? "").includes(q));
	}, [data, search]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Customers",
			description: `${filtered.length} registered customers`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			placeholder: "Search name, email or mobile",
			value: search,
			onChange: (e) => setSearch(e.target.value),
			className: "mb-4 max-w-xs"
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-xl" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/50 text-left text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Orders"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Lifetime value"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Last order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
					className: "divide-y",
					children: [filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-medium",
							children: c.name ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3 text-muted-foreground",
							children: [c.email, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: c.mobile ?? ""
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: c.stats.count
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-semibold",
							children: inr(c.stats.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 text-muted-foreground",
							children: c.stats.last ? new Date(c.stats.last).toLocaleDateString("en-IN") : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 text-right",
							children: c.mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://wa.me/91${c.mobile}`,
									target: "_blank",
									rel: "noopener noreferrer",
									children: "WhatsApp"
								})
							})
						})
					] }, c.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-6 text-center text-muted-foreground",
						colSpan: 6,
						children: "No customers found."
					}) })]
				})]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCustomers, {}) });
//#endregion
export { SplitComponent as component };
