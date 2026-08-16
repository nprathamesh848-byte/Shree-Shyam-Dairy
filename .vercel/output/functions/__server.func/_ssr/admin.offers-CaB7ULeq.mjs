import { t as supabase } from "./client-C9b7jjpj.mjs";
import { t as Button } from "./logo-DKea5PPW.mjs";
import { H as __toESM, M as require_jsx_runtime, N as require_react } from "./server-DVY_7xHe.mjs";
import { c as useQueryClient, o as toast } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-BjGG6hzA.mjs";
import { t as Pencil } from "./pencil-D8mkyg7w.mjs";
import { t as Trash2 } from "./trash-2-DXYfzZjg.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CzYM0eRi.mjs";
import { t as Input } from "./input-TCdORDtb.mjs";
import { t as Label } from "./label-yglAzruz.mjs";
import { t as Switch } from "./switch-CgdO1_u1.mjs";
import { t as Textarea } from "./textarea-D5ZcxPEo.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CQ5KSNY8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.offers-CaB7ULeq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	title: "",
	description: "",
	terms: "",
	discount_type: "percentage",
	discount_value: 10,
	minimum_order: 0,
	start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	end_date: "",
	status: true
};
function AdminOffers() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const { data } = useQuery({
		queryKey: ["admin", "offers"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return rows ?? [];
		}
	});
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "offers"] });
		queryClient.invalidateQueries({ queryKey: ["offers"] });
	};
	const save = async () => {
		if (form.title.trim().length < 2) {
			toast.error("Enter an offer title.");
			return;
		}
		const payload = {
			name: form.title.trim(),
			description: form.description.trim() || null,
			terms: form.terms.trim() || null,
			discount_type: form.discount_type,
			discount_value: Number(form.discount_value),
			minimum_order: Number(form.minimum_order) || 0,
			start_date: new Date(form.start_date).toISOString(),
			end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
			status: form.status
		};
		const { error } = form.id ? await supabase.from("offers").update(payload).eq("id", form.id) : await supabase.from("offers").insert(payload);
		if (error) {
			toast.error("Could not save the offer.");
			return;
		}
		toast.success("Offer saved.");
		setOpen(false);
		setForm(EMPTY);
		refresh();
	};
	const remove = async (id) => {
		await supabase.from("offers").delete().eq("id", id);
		toast.success("Offer deleted.");
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Offers",
			description: "Promotions shown on the offers page",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "rounded-full",
				onClick: () => {
					setForm(EMPTY);
					setOpen(true);
				},
				children: "Add offer"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: data?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex items-start justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-semibold",
							children: [o.name, !o.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Inactive"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [o.discount_type === "percentage" ? `${o.discount_value}% off` : `₹${o.discount_value} off`, Number(o.minimum_order) > 0 ? ` · min ₹${o.minimum_order}` : ""]
						}),
						o.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
							children: o.description
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Edit",
						onClick: () => {
							setForm({
								id: o.id,
								title: o.name,
								description: o.description ?? "",
								terms: o.terms ?? "",
								discount_type: o.discount_type,
								discount_value: Number(o.discount_value),
								minimum_order: Number(o.minimum_order ?? 0),
								start_date: o.start_date.slice(0, 10),
								end_date: o.end_date ? o.end_date.slice(0, 10) : "",
								status: o.status
							});
							setOpen(true);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Delete",
						onClick: () => remove(o.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})]
				})]
			}, o.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "Edit offer" : "Add offer" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.title,
									onChange: (e) => setForm({
										...form,
										title: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: form.description,
									onChange: (e) => setForm({
										...form,
										description: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Discount value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Terms" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.terms,
											onChange: (e) => setForm({
												...form,
												terms: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Start date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "date",
											value: form.start_date,
											onChange: (e) => setForm({
												...form,
												start_date: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "End date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "date",
											value: form.end_date,
											onChange: (e) => setForm({
												...form,
												end_date: e.target.value
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
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
						children: "Save offer"
					}) })
				]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOffers, {}) });
//#endregion
export { SplitComponent as component };
