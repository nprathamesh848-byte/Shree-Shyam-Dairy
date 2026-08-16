import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./logo-BmbwPOq5.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-D6wn2bDk.mjs";
import { t as Badge } from "./badge-BSf8tcxY.mjs";
import { t as Input } from "./input-DKb1UZ9E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Skeleton } from "./skeleton-Z3CvlVhe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.inventory-CIREtKVa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminInventory() {
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [lowOnly, setLowOnly] = (0, import_react.useState)(false);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "inventory"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("product_variants").select("id,label,price,stock,minimum_stock, products(name)").order("stock");
			if (error) throw error;
			return rows ?? [];
		}
	});
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return (data ?? []).filter((r) => (!q || `${r.products?.name ?? ""} ${r.label}`.toLowerCase().includes(q)) && (!lowOnly || Number(r.stock) <= Number(r.minimum_stock)));
	}, [
		data,
		search,
		lowOnly
	]);
	const saveStock = async (row) => {
		const value = Number(drafts[row.id]);
		if (!Number.isFinite(value) || value < 0) {
			toast.error("Enter a valid stock quantity.");
			return;
		}
		const { error } = await supabase.from("product_variants").update({ stock: value }).eq("id", row.id);
		if (error) {
			toast.error("Could not update stock.");
			return;
		}
		toast.success(`Stock updated for ${row.products?.name} ${row.label}.`);
		setDrafts((d) => {
			const next = { ...d };
			delete next[row.id];
			return next;
		});
		queryClient.invalidateQueries({ queryKey: ["admin", "inventory"] });
		queryClient.invalidateQueries({ queryKey: ["products"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Inventory",
			description: "Update stock levels in one place"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Search product or variant",
				value: search,
				onChange: (e) => setSearch(e.target.value),
				className: "max-w-xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: lowOnly ? "default" : "outline",
				onClick: () => setLowOnly((v) => !v),
				children: "Low stock only"
			})]
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-14 rounded-xl" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/50 text-left text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Variant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Min"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
					className: "divide-y",
					children: [filtered.map((r) => {
						const low = Number(r.stock) <= Number(r.minimum_stock);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 font-medium",
								children: r.products?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								children: r.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								children: inr(r.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-muted-foreground",
								children: r.minimum_stock
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										className: "h-9 w-24",
										value: drafts[r.id] ?? String(r.stock),
										onChange: (e) => setDrafts({
											...drafts,
											[r.id]: e.target.value
										})
									}), low && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "destructive",
										children: "Low"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									disabled: drafts[r.id] === void 0,
									onClick: () => saveStock(r),
									children: "Save"
								})
							})
						] }, r.id);
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-6 text-center text-muted-foreground",
						colSpan: 6,
						children: "No variants found."
					}) })]
				})]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInventory, {}) });
//#endregion
export { SplitComponent as component };
