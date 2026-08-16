import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Pencil, o as Trash2, y as Plus } from "../_libs/lucide-react.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-W2HguScW.mjs";
import { t as Badge } from "./badge-ByWGWW5n.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-owAAMjYH.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Label } from "./label-CowN4eUm.mjs";
import { t as Switch } from "./switch-BGa-8KMc.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DrxOICHT.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BZa4U2dv.mjs";
import { t as Skeleton } from "./skeleton-DAHqFqkY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.products-C9f89r7f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_VARIANT = {
	label: "",
	unit: "ml",
	quantity: 500,
	price: 0,
	mrp: null,
	stock: 0,
	minimum_stock: 5,
	status: true
};
var EMPTY = {
	name: "",
	description: "",
	image: "",
	ingredients: "",
	benefits: "",
	storage_instructions: "",
	category_id: "",
	status: true,
	variants: [{ ...EMPTY_VARIANT }]
};
function AdminProducts() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [search, setSearch] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: categories } = useQuery({
		queryKey: ["admin", "categories"],
		queryFn: async () => {
			const { data } = await supabase.from("categories").select("*").order("sort_order");
			return data ?? [];
		}
	});
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "products"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("products").select("*, product_variants(*)").order("name");
			if (error) throw error;
			return rows ?? [];
		}
	});
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return (data ?? []).filter((p) => !q || p.name.toLowerCase().includes(q));
	}, [data, search]);
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
		queryClient.invalidateQueries({ queryKey: ["products"] });
		queryClient.invalidateQueries({ queryKey: ["admin", "inventory"] });
	};
	const save = async () => {
		if (form.name.trim().length < 2) {
			toast.error("Enter a product name.");
			return;
		}
		if (form.variants.length === 0 || form.variants.some((v) => !v.label.trim() || v.price <= 0)) {
			toast.error("Each variant needs a label and a price above zero.");
			return;
		}
		setSaving(true);
		const payload = {
			name: form.name.trim(),
			description: form.description.trim() || null,
			image: form.image.trim() || null,
			ingredients: form.ingredients.trim() || null,
			benefits: form.benefits.trim() || null,
			storage_instructions: form.storage_instructions.trim() || null,
			category_id: form.category_id || null,
			status: form.status
		};
		let productId = form.id;
		if (productId) {
			const { error } = await supabase.from("products").update(payload).eq("id", productId);
			if (error) {
				setSaving(false);
				toast.error("Could not save the product.");
				return;
			}
		} else {
			const { data: inserted, error } = await supabase.from("products").insert(payload).select("id").single();
			if (error || !inserted) {
				setSaving(false);
				toast.error("Could not create the product.");
				return;
			}
			productId = inserted.id;
		}
		const keepIds = form.variants.filter((v) => v.id).map((v) => v.id);
		const toDelete = (data?.find((p) => p.id === productId)?.product_variants ?? []).filter((v) => !keepIds.includes(v.id)).map((v) => v.id);
		if (toDelete.length > 0) await supabase.from("product_variants").delete().in("id", toDelete);
		for (const v of form.variants) {
			const vPayload = {
				product_id: productId,
				label: v.label.trim(),
				unit: v.unit,
				quantity: Number(v.quantity) || 0,
				price: Number(v.price),
				mrp: v.mrp === null || v.mrp === void 0 || Number.isNaN(Number(v.mrp)) ? null : Number(v.mrp),
				stock: Number(v.stock) || 0,
				minimum_stock: Number(v.minimum_stock) || 0,
				status: v.status
			};
			if (v.id) await supabase.from("product_variants").update(vPayload).eq("id", v.id);
			else await supabase.from("product_variants").insert(vPayload);
		}
		setSaving(false);
		toast.success("Product saved.");
		setOpen(false);
		setForm(EMPTY);
		refresh();
	};
	const remove = async (id) => {
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) {
			toast.error("This product has orders and cannot be deleted. Set it inactive instead.");
			return;
		}
		toast.success("Product deleted.");
		refresh();
	};
	const toggleStatus = async (p) => {
		await supabase.from("products").update({ status: !p.status }).eq("id", p.id);
		refresh();
	};
	const setVariant = (index, patch) => setForm((f) => ({
		...f,
		variants: f.variants.map((v, i) => i === index ? {
			...v,
			...patch
		} : v)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Products",
			description: `${filtered.length} products`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "rounded-full",
				onClick: () => {
					setForm(EMPTY);
					setOpen(true);
				},
				children: "Add product"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			placeholder: "Search products",
			value: search,
			onChange: (e) => setSearch(e.target.value),
			className: "mb-4 max-w-xs"
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-xl" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-wrap items-center gap-4 p-4",
				children: [
					p.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.image,
						alt: p.name,
						className: "h-14 w-14 rounded-xl object-cover",
						loading: "lazy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-semibold",
							children: [p.name, !p.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Inactive"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								p.product_variants.length,
								" variants ·",
								" ",
								p.product_variants.map((v) => `${v.label} ${inr(v.price)}`).join(", ")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: p.status,
								onCheckedChange: () => toggleStatus(p)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Edit",
								onClick: () => {
									setForm({
										id: p.id,
										name: p.name,
										description: p.description ?? "",
										image: p.image ?? "",
										ingredients: p.ingredients ?? "",
										benefits: p.benefits ?? "",
										storage_instructions: p.storage_instructions ?? "",
										category_id: p.category_id ?? "",
										status: p.status,
										variants: p.product_variants.map((v) => ({ ...v }))
									});
									setOpen(true);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Delete",
								onClick: () => remove(p.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
							})
						]
					})
				]
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-h-[90vh] max-w-2xl overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "Edit product" : "Add product" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										})
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.category_id,
										onValueChange: (v) => setForm({
											...form,
											category_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: c.id,
											children: c.name
										}, c.id)) })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Image URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.image,
									onChange: (e) => setForm({
										...form,
										image: e.target.value
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
								className: "grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ingredients" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 2,
											value: form.ingredients,
											onChange: (e) => setForm({
												...form,
												ingredients: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Benefits" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 2,
											value: form.benefits,
											onChange: (e) => setForm({
												...form,
												benefits: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Storage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 2,
											value: form.storage_instructions,
											onChange: (e) => setForm({
												...form,
												storage_instructions: e.target.value
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display font-bold",
										children: "Variants"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setForm({
											...form,
											variants: [...form.variants, { ...EMPTY_VARIANT }]
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add variant"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 space-y-3",
									children: form.variants.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 sm:grid-cols-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Label",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: v.label,
													onChange: (e) => setVariant(i, { label: e.target.value })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Unit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: v.unit,
													onValueChange: (u) => setVariant(i, { unit: u }),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
														"ml",
														"litre",
														"gm",
														"kg",
														"piece",
														"dozen"
													].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: u,
														children: u
													}, u)) })]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Quantity",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: v.quantity,
													onChange: (e) => setVariant(i, { quantity: Number(e.target.value) })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Price",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: v.price,
													onChange: (e) => setVariant(i, { price: Number(e.target.value) })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "MRP",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: v.mrp ?? "",
													onChange: (e) => setVariant(i, { mrp: e.target.value === "" ? null : Number(e.target.value) })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Stock",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: v.stock,
													onChange: (e) => setVariant(i, { stock: Number(e.target.value) })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Min stock",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													value: v.minimum_stock,
													onChange: (e) => setVariant(i, { minimum_stock: Number(e.target.value) })
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-end justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex items-center gap-2 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
														checked: v.status,
														onCheckedChange: (s) => setVariant(i, { status: s })
													}), "Active"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "icon",
													"aria-label": "Remove variant",
													onClick: () => setForm({
														...form,
														variants: form.variants.filter((_, x) => x !== i)
													}),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
												})]
											})
										]
									}, i))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full",
						onClick: save,
						disabled: saving,
						children: saving ? "Saving…" : "Save product"
					}) })
				]
			})
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs",
			children: label
		}), children]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminProducts, {}) });
//#endregion
export { SplitComponent as component };
