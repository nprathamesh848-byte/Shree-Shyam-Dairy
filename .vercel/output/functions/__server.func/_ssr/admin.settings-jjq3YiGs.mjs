import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Cyo6ACxZ.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { t as BUSINESS } from "./business-U2QbWJX3.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as AdminPageHeader, t as AdminLayout } from "./AdminLayout-W2HguScW.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Label } from "./label-CowN4eUm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DrxOICHT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-jjq3YiGs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminSettings() {
	const queryClient = useQueryClient();
	const [delivery, setDelivery] = (0, import_react.useState)({
		delivery_charge: 30,
		free_delivery_threshold: 500,
		minimum_order: 0,
		areas: "",
		pincodes: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data } = useQuery({
		queryKey: ["admin", "settings"],
		queryFn: async () => {
			const { data: rows } = await supabase.from("settings").select("*");
			return rows ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		const row = data?.find((r) => r.key === "delivery");
		if (!row) return;
		const v = row.value ?? {};
		setDelivery({
			delivery_charge: Number(v["delivery_charge"] ?? 30),
			free_delivery_threshold: Number(v["free_delivery_threshold"] ?? 500),
			minimum_order: Number(v["minimum_order"] ?? 0),
			areas: (v["areas"] ?? []).join(", "),
			pincodes: (v["pincodes"] ?? []).join(", ")
		});
	}, [data]);
	const save = async () => {
		setSaving(true);
		const value = {
			delivery_charge: Number(delivery.delivery_charge) || 0,
			free_delivery_threshold: Number(delivery.free_delivery_threshold) || 0,
			minimum_order: Number(delivery.minimum_order) || 0,
			areas: delivery.areas.split(",").map((s) => s.trim()).filter(Boolean),
			pincodes: delivery.pincodes.split(",").map((s) => s.trim()).filter(Boolean)
		};
		const { error } = await supabase.from("settings").upsert({
			key: "delivery",
			value
		}, { onConflict: "key" });
		setSaving(false);
		if (error) {
			toast.error("Could not save delivery settings.");
			return;
		}
		toast.success("Delivery settings saved.");
		queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
		queryClient.invalidateQueries({ queryKey: ["settings", "delivery"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Settings",
			description: "Delivery rules and business contact details"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "surface-card max-w-2xl space-y-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Delivery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Delivery charge (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: delivery.delivery_charge,
								onChange: (e) => setDelivery({
									...delivery,
									delivery_charge: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Free above (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: delivery.free_delivery_threshold,
								onChange: (e) => setDelivery({
									...delivery,
									free_delivery_threshold: Number(e.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Minimum order (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: delivery.minimum_order,
								onChange: (e) => setDelivery({
									...delivery,
									minimum_order: Number(e.target.value)
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Delivery areas (comma separated)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: delivery.areas,
						onChange: (e) => setDelivery({
							...delivery,
							areas: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Serviceable pincodes (comma separated)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 2,
						value: delivery.pincodes,
						onChange: (e) => setDelivery({
							...delivery,
							pincodes: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "rounded-full",
					onClick: save,
					disabled: saving,
					children: saving ? "Saving…" : "Save delivery settings"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "surface-card mt-4 max-w-2xl space-y-2 p-5 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Business details"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Name:"
					}),
					" ",
					BUSINESS.name
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Phone / WhatsApp:"
					}),
					" ",
					BUSINESS.phone
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Email:"
					}),
					" ",
					BUSINESS.email
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Address:"
					}),
					" ",
					BUSINESS.address
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Hours:"
					}),
					" ",
					BUSINESS.hours
				] })
			]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSettings, {}) });
//#endregion
export { SplitComponent as component };
