import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Pencil, o as Trash2 } from "../_libs/lucide-react.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-W2HguScW.mjs";
import { t as Badge } from "./badge-ByWGWW5n.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-owAAMjYH.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Label } from "./label-CowN4eUm.mjs";
import { t as Switch } from "./switch-BGa-8KMc.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BZa4U2dv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.coupons-glZ6oLoU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	code: "",
	discount_type: "percentage",
	discount_value: 10,
	minimum_order: 0,
	maximum_discount: "",
	usage_limit: "",
	expiry_date: "",
	status: true
};
function AdminCoupons() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const { data } = useQuery({
		queryKey: ["admin", "coupons"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return rows ?? [];
		}
	});
	const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });
	const save = async () => {
		const code = form.code.trim().toUpperCase();
		if (code.length < 3) {
			toast.error("Coupon code must be at least 3 characters.");
			return;
		}
		const payload = {
			code,
			discount_type: form.discount_type,
			discount_value: Number(form.discount_value),
			minimum_order: Number(form.minimum_order) || 0,
			maximum_discount: form.maximum_discount === "" ? null : Number(form.maximum_discount),
			usage_limit: form.usage_limit === "" ? null : Number(form.usage_limit),
			expiry_date: form.expiry_date ? new Date(form.expiry_date).toISOString() : null,
			status: form.status
		};
		const { error } = form.id ? await supabase.from("coupons").update(payload).eq("id", form.id) : await supabase.from("coupons").insert(payload);
		if (error) {
			toast.error("Could not save the coupon. The code may already exist.");
			return;
		}
		toast.success("Coupon saved.");
		setOpen(false);
		setForm(EMPTY);
		refresh();
	};
	const remove = async (id) => {
		await supabase.from("coupons").delete().eq("id", id);
		toast.success("Coupon deleted.");
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Coupons",
			description: "Discount codes customers can apply at checkout",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "rounded-full",
				onClick: () => {
					setForm(EMPTY);
					setOpen(true);
				},
				children: "Add coupon"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/50 text-left text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Discount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Min order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Used"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Expiry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-3",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
					className: "divide-y",
					children: [data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 font-mono font-semibold",
							children: c.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: c.discount_type === "percentage" ? `${c.discount_value}%${c.maximum_discount ? ` (max ${inr(c.maximum_discount)})` : ""}` : inr(c.discount_value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: inr(c.minimum_order ?? 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3",
							children: [c.used_count ?? 0, c.usage_limit ? ` / ${c.usage_limit}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3 text-muted-foreground",
							children: c.expiry_date ? new Date(c.expiry_date).toLocaleDateString("en-IN") : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: c.status ? "secondary" : "outline",
								className: "rounded-full",
								children: c.status ? "Active" : "Inactive"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "p-3 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Edit",
								onClick: () => {
									setForm({
										id: c.id,
										code: c.code,
										discount_type: c.discount_type,
										discount_value: Number(c.discount_value),
										minimum_order: Number(c.minimum_order ?? 0),
										maximum_discount: c.maximum_discount === null ? "" : String(c.maximum_discount),
										usage_limit: c.usage_limit === null ? "" : String(c.usage_limit),
										expiry_date: c.expiry_date ? c.expiry_date.slice(0, 10) : "",
										status: c.status
									});
									setOpen(true);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Delete",
								onClick: () => remove(c.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
							})]
						})
					] }, c.id)), (!data || data.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-6 text-center text-muted-foreground",
						colSpan: 7,
						children: "No coupons yet."
					}) })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "Edit coupon" : "Add coupon" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "font-mono uppercase",
									value: form.code,
									onChange: (e) => setForm({
										...form,
										code: e.target.value.toUpperCase()
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Discount type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.discount_type,
									onValueChange: (v) => setForm({
										...form,
										discount_type: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "percentage",
										children: "Percentage"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "fixed",
										children: "Fixed amount"
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.discount_value,
									onChange: (e) => setForm({
										...form,
										discount_value: Number(e.target.value)
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Minimum order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.minimum_order,
									onChange: (e) => setForm({
										...form,
										minimum_order: Number(e.target.value)
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Max discount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.maximum_discount,
									onChange: (e) => setForm({
										...form,
										maximum_discount: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Usage limit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.usage_limit,
									onChange: (e) => setForm({
										...form,
										usage_limit: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Expiry date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.expiry_date,
									onChange: (e) => setForm({
										...form,
										expiry_date: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: form.status,
									onCheckedChange: (v) => setForm({
										...form,
										status: v
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Active" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full",
						onClick: save,
						children: "Save coupon"
					}) })
				]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCoupons, {}) });
//#endregion
export { SplitComponent as component };
