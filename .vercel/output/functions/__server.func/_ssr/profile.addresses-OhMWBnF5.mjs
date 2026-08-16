import { t as supabase } from "./client-C9b7jjpj.mjs";
import { t as Button } from "./logo-DKea5PPW.mjs";
import { H as __toESM, M as require_jsx_runtime, N as require_react } from "./server-DVY_7xHe.mjs";
import { a as stringType, i as objectType } from "./types-CpclA7ER.mjs";
import { c as useQueryClient, o as toast, w as Link } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { t as Pencil } from "./pencil-D8mkyg7w.mjs";
import { t as Trash2 } from "./trash-2-DXYfzZjg.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-CzYM0eRi.mjs";
import { t as Input } from "./input-TCdORDtb.mjs";
import { t as Label } from "./label-yglAzruz.mjs";
import { t as Textarea } from "./textarea-D5ZcxPEo.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CQ5KSNY8.mjs";
import { r as myAddressesQuery } from "./queries-CUXl3ju3.mjs";
import { i as MapPin, n as CustomerLayout } from "./CustomerLayout-BzHiSlH4.mjs";
import { t as EmptyState } from "./EmptyState-DO_ROLMb.mjs";
import { t as RequireAuth } from "./RequireAuth-CesbTmf8.mjs";
import { t as Star } from "./star-CgoMXm1y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.addresses-OhMWBnF5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(2).max(80),
	mobile: stringType().trim().regex(/^[6-9]\d{9}$/),
	address: stringType().trim().min(5).max(400),
	landmark: stringType().trim().max(120),
	city: stringType().trim().min(2).max(80),
	pincode: stringType().trim().regex(/^\d{6}$/),
	type: stringType()
});
var EMPTY = {
	name: "",
	mobile: "",
	address: "",
	landmark: "",
	city: "",
	pincode: "",
	type: "home",
	is_default: false
};
function AddressesPage() {
	const { data, isLoading } = useQuery(myAddressesQuery);
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const refresh = () => queryClient.invalidateQueries({ queryKey: ["addresses"] });
	const save = async () => {
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			toast.error("Please fill all address fields correctly.");
			return;
		}
		setSaving(true);
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return;
		const payload = {
			...parsed.data,
			is_default: form.is_default,
			user_id: auth.user.id
		};
		const { error } = form.id ? await supabase.from("addresses").update(payload).eq("id", form.id) : await supabase.from("addresses").insert(payload);
		if (!error && form.is_default) await supabase.from("addresses").update({ is_default: false }).eq("user_id", auth.user.id).neq("id", form.id ?? "00000000-0000-0000-0000-000000000000");
		setSaving(false);
		if (error) {
			toast.error("Unable to save the address. Please try again.");
			return;
		}
		toast.success("Address saved successfully.");
		setOpen(false);
		setForm(EMPTY);
		refresh();
	};
	const remove = async (id) => {
		const { error } = await supabase.from("addresses").delete().eq("id", id);
		if (error) {
			toast.error("Unable to delete this address.");
			return;
		}
		toast.success("Address removed.");
		refresh();
	};
	const setDefault = async (id) => {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return;
		await supabase.from("addresses").update({ is_default: false }).eq("user_id", auth.user.id);
		await supabase.from("addresses").update({ is_default: true }).eq("id", id);
		toast.success("Default address updated.");
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/profile",
				className: "text-sm text-primary",
				children: "← Back to profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "My Addresses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: (o) => {
						setOpen(o);
						if (!o) setForm(EMPTY);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "rounded-full",
							children: "Add address"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "max-h-[90vh] overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: form.id ? "Edit address" : "Add address" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
										label: "Full name",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.name,
											onChange: (e) => setForm({
												...form,
												name: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
										label: "Mobile",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											maxLength: 10,
											value: form.mobile,
											onChange: (e) => setForm({
												...form,
												mobile: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
										label: "Address",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 3,
											value: form.address,
											onChange: (e) => setForm({
												...form,
												address: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
										label: "Landmark",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.landmark,
											onChange: (e) => setForm({
												...form,
												landmark: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
											label: "City",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: form.city,
												onChange: (e) => setForm({
													...form,
													city: e.target.value
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
											label: "Pincode",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												maxLength: 6,
												value: form.pincode,
												onChange: (e) => setForm({
													...form,
													pincode: e.target.value
												})
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Labeled, {
										label: "Type",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.type,
											onValueChange: (v) => setForm({
												...form,
												type: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "home",
													children: "Home"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "work",
													children: "Work"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "other",
													children: "Other"
												})
											] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: form.is_default,
											onChange: (e) => setForm({
												...form,
												is_default: e.target.checked
											})
										}), "Set as default address"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: save,
								disabled: saving,
								className: "rounded-full",
								children: saving ? "Saving…" : "Save address"
							}) })
						]
					})]
				})]
			}),
			!isLoading && (!data || data.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: MapPin,
					title: "No addresses yet",
					description: "Add a delivery address to check out faster next time."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3",
				children: data?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "surface-card p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 font-semibold",
								children: [
									a.name,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "rounded-full capitalize",
										children: a.type
									}),
									a.is_default && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "rounded-full",
										children: "Default"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: a.mobile
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									a.address,
									a.landmark ? `, ${a.landmark}` : "",
									", ",
									a.city,
									" - ",
									a.pincode
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-1",
							children: [
								!a.is_default && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => setDefault(a.id),
									"aria-label": "Set default",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Edit",
									onClick: () => {
										setForm({
											id: a.id,
											name: a.name,
											mobile: a.mobile,
											address: a.address,
											landmark: a.landmark ?? "",
											city: a.city,
											pincode: a.pincode,
											type: a.type,
											is_default: a.is_default
										});
										setOpen(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Delete",
									onClick: () => remove(a.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
								})
							]
						})]
					})
				}, a.id))
			})
		]
	});
}
function Labeled({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressesPage, {}) }) });
//#endregion
export { SplitComponent as component };
