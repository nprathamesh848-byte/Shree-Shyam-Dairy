import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./logo-BmbwPOq5.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as Pencil, o as Trash2 } from "../_libs/lucide-react.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-D6wn2bDk.mjs";
import { t as Badge } from "./badge-BSf8tcxY.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CpurG_0W.mjs";
import { t as Input } from "./input-DKb1UZ9E.mjs";
import { t as Label } from "./label-Czf2Nl4M.mjs";
import { t as Switch } from "./switch-FViA_ZHz.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.banners-6-yn8OCe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	title: "",
	image: "",
	link: "",
	subtitle: "",
	start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	end_date: "",
	status: true
};
function AdminBanners() {
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const { data } = useQuery({
		queryKey: ["admin", "banners"],
		queryFn: async () => {
			const { data: rows, error } = await supabase.from("banners").select("*").order("start_date", { ascending: false });
			if (error) throw error;
			return rows ?? [];
		}
	});
	const refresh = () => {
		queryClient.invalidateQueries({ queryKey: ["admin", "banners"] });
		queryClient.invalidateQueries({ queryKey: ["banners"] });
	};
	const save = async () => {
		if (!form.title.trim() || !form.image.trim()) {
			toast.error("A banner title and image URL are required.");
			return;
		}
		const payload = {
			title: form.title.trim(),
			image: form.image.trim(),
			button_link: form.link.trim() || null,
			subtitle: form.subtitle.trim() || null,
			start_date: new Date(form.start_date).toISOString(),
			end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
			status: form.status
		};
		const { error } = form.id ? await supabase.from("banners").update(payload).eq("id", form.id) : await supabase.from("banners").insert(payload);
		if (error) {
			toast.error("Could not save the banner.");
			return;
		}
		toast.success("Banner saved.");
		setOpen(false);
		setForm(EMPTY);
		refresh();
	};
	const remove = async (id) => {
		await supabase.from("banners").delete().eq("id", id);
		toast.success("Banner deleted.");
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Banners",
			description: "Promotional images shown on the home page",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "rounded-full",
				onClick: () => {
					setForm(EMPTY);
					setOpen(true);
				},
				children: "Add banner"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [data?.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: b.image ?? "",
					alt: b.title,
					className: "h-32 w-full object-cover",
					loading: "lazy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-semibold",
							children: [b.title, !b.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Inactive"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: b.button_link ?? "No link"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Edit",
							onClick: () => {
								setForm({
									id: b.id,
									title: b.title,
									image: b.image ?? "",
									link: b.button_link ?? "",
									subtitle: b.subtitle ?? "",
									start_date: b.start_date.slice(0, 10),
									end_date: b.end_date ? b.end_date.slice(0, 10) : "",
									status: b.status
								});
								setOpen(true);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							"aria-label": "Delete",
							onClick: () => remove(b.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
						})]
					})]
				})]
			}, b.id)), (!data || data.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No banners yet."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "Edit banner" : "Add banner" }) }),
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Link" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.link,
								placeholder: "/products",
								onChange: (e) => setForm({
									...form,
									link: e.target.value
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subtitle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.subtitle,
										onChange: (e) => setForm({
											...form,
											subtitle: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "End" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
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
					children: "Save banner"
				}) })
			] })
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBanners, {}) });
//#endregion
export { SplitComponent as component };
