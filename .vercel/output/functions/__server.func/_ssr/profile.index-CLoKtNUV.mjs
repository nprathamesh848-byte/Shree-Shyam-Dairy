import { t as supabase } from "./client-C9b7jjpj.mjs";
import { i as LogOut, t as Button } from "./logo-DKea5PPW.mjs";
import { H as __toESM, M as require_jsx_runtime, N as require_react } from "./server-DVY_7xHe.mjs";
import { T as useNavigate, c as useQueryClient, o as toast, w as Link } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { t as Input } from "./input-TCdORDtb.mjs";
import { t as Label } from "./label-yglAzruz.mjs";
import { o as myProfileQuery } from "./queries-CUXl3ju3.mjs";
import { i as MapPin, n as CustomerLayout, t as Bell } from "./CustomerLayout-BzHiSlH4.mjs";
import { t as RequireAuth } from "./RequireAuth-CesbTmf8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.index-CLoKtNUV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { data: profile } = useQuery(myProfileQuery);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile) {
			setName(profile.name ?? "");
			setMobile(profile.mobile ?? "");
		}
	}, [profile]);
	const save = async () => {
		if (!profile) return;
		setSaving(true);
		const { error } = await supabase.from("profiles").update({
			name: name.trim(),
			mobile: mobile.trim()
		}).eq("id", profile.id);
		setSaving(false);
		if (error) {
			toast.error("Unable to save your profile. Please try again.");
			return;
		}
		toast.success("Profile updated successfully.");
		queryClient.invalidateQueries({ queryKey: ["profile"] });
	};
	const signOut = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "My Profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface-card mt-6 space-y-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Personal information"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mobile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: mobile,
							maxLength: 10,
							onChange: (e) => setMobile(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: profile?.email ?? "",
							readOnly: true,
							className: "bg-muted"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full",
						onClick: save,
						disabled: saving,
						children: saving ? "Saving…" : "Save changes"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "justify-start rounded-2xl py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/profile/addresses",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-2 h-4 w-4" }), " My Addresses"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "justify-start rounded-2xl py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/notifications",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mr-2 h-4 w-4" }), " Notifications"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				className: "mt-6 text-destructive",
				onClick: signOut,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), " Log out"]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePage, {}) }) });
//#endregion
export { SplitComponent as component };
