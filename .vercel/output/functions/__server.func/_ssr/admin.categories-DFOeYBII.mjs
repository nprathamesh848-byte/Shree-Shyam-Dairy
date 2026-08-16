import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Pencil, o as Trash2 } from "../_libs/lucide-react.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-W2HguScW.mjs";
import { t as Badge } from "./badge-ByWGWW5n.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-owAAMjYH.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Label } from "./label-CowN4eUm.mjs";
import { t as Switch } from "./switch-BGa-8KMc.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DrxOICHT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.categories-DFOeYBII.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	name: "",
	slug: "",
	description: "",
	image: "",
	sort_order: 0,
	status: true
};
var slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function AdminCategories() {
	const queryClient = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [open, setOpen] = (0, import_react.useState)(false);
	const { data } = useQuery({
		queryKey: ["admin", "categories"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("categories").select("*").order("sort_order");
			if (error) throw error;
			return rows ?? [];
		}
	});
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
		queryClient.invalidateQueries({ queryKey: ["categories"] });
	};
	const save = async () => {
		if (form.name.trim().length < 2) {
			toast.error("Please enter a category name.");
			return;
		}
		const payload = {
			name: form.name.trim(),
			slug: slugify(form.slug || form.name),
			description: form.description.trim() || null,
			image: form.image.trim() || null,
			sort_order: Number(form.sort_order) || 0,
			status: form.status
		};
		const { error } = form.id ? await supabase.from("categories").update(payload).eq("id", form.id) : await supabase.from("categories").insert(payload);
		if (error) {
			toast.error("Could not save the category.");
			return;
		}
		toast.success("Category saved.");
		setOpen(false);
		setForm(EMPTY);
		refresh();
	};
	const remove = async (id) => {
		const { error } = await supabase.from("categories").delete().eq("id", id);
		if (error) {
			toast.error("Category is in use and cannot be deleted.");
			return;
		}
		toast.success("Category deleted.");
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Categories",
			description: "Organise your product catalogue",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "rounded-full",
				onClick: () => {
					setForm(EMPTY);
					setOpen(true);
				},
				children: "Add category"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: data?.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex items-start justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-semibold",
							children: [c.name, !c.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Hidden"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: ["/", c.slug]
						}),
						c.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
							children: c.description
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
								id: c.id,
								name: c.name,
								slug: c.slug,
								description: c.description ?? "",
								image: c.image ?? "",
								sort_order: c.sort_order ?? 0,
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
				})]
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "Edit category" : "Add category" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Slug (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.slug,
								placeholder: slugify(form.name),
								onChange: (e) => setForm({
									...form,
									slug: e.target.value
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Sort order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: form.sort_order,
								onChange: (e) => setForm({
									...form,
									sort_order: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: form.status,
								onCheckedChange: (v) => setForm({
									...form,
									status: v
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Visible to customers" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "rounded-full",
					onClick: save,
					children: "Save category"
				}) })
			] })
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCategories, {}) });
//#endregion
export { SplitComponent as component };
