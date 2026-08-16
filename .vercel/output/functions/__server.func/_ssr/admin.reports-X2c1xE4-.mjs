import { t as supabase } from "./client-C9b7jjpj.mjs";
import { t as Button } from "./logo-DKea5PPW.mjs";
import { H as __toESM, M as require_jsx_runtime, N as require_react } from "./server-DVY_7xHe.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { r as STATUS_LABELS, s as inr } from "./business-U2QbWJX3.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-BjGG6hzA.mjs";
import { t as Skeleton } from "./skeleton-C5JQaj4b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-X2c1xE4-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RANGES = [
	{
		key: "7",
		label: "Last 7 days"
	},
	{
		key: "30",
		label: "Last 30 days"
	},
	{
		key: "90",
		label: "Last 90 days"
	},
	{
		key: "all",
		label: "All time"
	}
];
function AdminReports() {
	const [range, setRange] = (0, import_react.useState)("30");
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "reports"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("orders").select("id,total,order_status,created_at, order_items(product_name,variant_label,quantity,subtotal)").order("created_at", { ascending: false }).limit(1e3);
			if (error) throw error;
			return rows ?? [];
		}
	});
	const report = (0, import_react.useMemo)(() => {
		if (!data) return null;
		const cutoff = range === "all" ? 0 : Date.now() - Number(range) * 24 * 60 * 60 * 1e3;
		const rows = data.filter((o) => new Date(o.created_at).getTime() >= cutoff);
		const valid = rows.filter((o) => o.order_status !== "cancelled");
		const revenue = valid.reduce((s, o) => s + Number(o.total), 0);
		const byStatus = {};
		for (const o of rows) byStatus[o.order_status] = (byStatus[o.order_status] ?? 0) + 1;
		const byDay = /* @__PURE__ */ new Map();
		for (const o of valid) {
			const d = new Date(o.created_at).toLocaleDateString("en-IN");
			byDay.set(d, (byDay.get(d) ?? 0) + Number(o.total));
		}
		const products = /* @__PURE__ */ new Map();
		for (const o of valid) for (const i of o.order_items ?? []) {
			const key = `${i.product_name} · ${i.variant_label}`;
			const prev = products.get(key) ?? {
				qty: 0,
				revenue: 0
			};
			products.set(key, {
				qty: prev.qty + i.quantity,
				revenue: prev.revenue + Number(i.subtotal)
			});
		}
		return {
			orders: rows.length,
			revenue,
			avg: valid.length ? revenue / valid.length : 0,
			byStatus,
			byDay: [...byDay.entries()].slice(0, 14),
			topProducts: [...products.entries()].sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 10)
		};
	}, [data, range]);
	const exportCsv = () => {
		if (!report) return;
		const lines = ["Product,Quantity,Revenue"];
		for (const [name, s] of report.topProducts) lines.push(`"${name}",${s.qty},${s.revenue}`);
		const blob = new Blob([lines.join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `ssd-report-${range}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};
	if (isLoading || !report) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-3",
		children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-2xl" }, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Reports",
			description: "Sales performance",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "rounded-full",
				onClick: exportCsv,
				children: "Export CSV"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: range === r.key ? "default" : "outline",
				onClick: () => setRange(r.key),
				children: r.label
			}, r.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Orders",
					value: String(report.orders)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Revenue",
					value: inr(report.revenue)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					label: "Average order value",
					value: inr(report.avg)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Orders by status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: Object.entries(report.byStatus).map(([s, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: STATUS_LABELS[s] ?? s
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: n
						})]
					}, s))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Daily revenue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [report.byDay.map(([d, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: inr(v)
						})]
					}, d)), report.byDay.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-muted-foreground",
						children: "No sales in this range."
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "surface-card mt-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold",
				children: "Top products"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2 text-sm",
				children: [report.topProducts.map(([name, s]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate text-muted-foreground",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 font-semibold",
						children: [
							s.qty,
							" sold · ",
							inr(s.revenue)
						]
					})]
				}, name)), report.topProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted-foreground",
					children: "No data yet."
				})]
			})]
		})
	] });
}
function Card({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-2xl font-bold",
			children: value
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminReports, {}) });
//#endregion
export { SplitComponent as component };
