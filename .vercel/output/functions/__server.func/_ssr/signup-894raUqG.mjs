import { t as supabase } from "./client-C9b7jjpj.mjs";
import { b as useAuth, t as Button } from "./logo-DKea5PPW.mjs";
import { H as __toESM, M as require_jsx_runtime, N as require_react } from "./server-DVY_7xHe.mjs";
import { a as stringType, i as objectType } from "./types-CpclA7ER.mjs";
import { T as useNavigate, o as toast, w as Link } from "./router-C6_53GK8.mjs";
import { t as Input } from "./input-TCdORDtb.mjs";
import { t as Label } from "./label-yglAzruz.mjs";
import { n as CustomerLayout } from "./CustomerLayout-BzHiSlH4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-894raUqG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(2).max(80),
	mobile: stringType().trim().regex(/^[6-9]\d{9}$/),
	email: stringType().trim().email().max(255),
	password: stringType().min(6).max(72)
});
function SignupPage() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		mobile: "",
		email: "",
		password: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({
			to: "/",
			replace: true
		});
	}, [
		loading,
		user,
		navigate
	]);
	const submit = async (e) => {
		e.preventDefault();
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			toast.error("Check your details: valid name, 10-digit mobile, email and 6+ character password.");
			return;
		}
		setBusy(true);
		const { error } = await supabase.auth.signUp({
			email: parsed.data.email,
			password: parsed.data.password,
			options: {
				emailRedirectTo: `${window.location.origin}/`,
				data: {
					name: parsed.data.name,
					mobile: parsed.data.mobile
				}
			}
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Account created. Welcome to Shree Shyam Dairy!");
		navigate({
			to: "/",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Create account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Fresh dairy, delivered to your door."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "surface-card mt-6 space-y-4 p-5",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "mobile",
							children: "Mobile"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "mobile",
							maxLength: 10,
							inputMode: "numeric",
							value: form.mobile,
							onChange: (e) => setForm({
								...form,
								mobile: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							autoComplete: "email",
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							autoComplete: "new-password",
							value: form.password,
							onChange: (e) => setForm({
								...form,
								password: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full rounded-full",
						disabled: busy,
						children: busy ? "Creating account…" : "Sign up"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-center text-sm text-muted-foreground",
				children: [
					"Already have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-medium text-primary",
						children: "Log in"
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupPage, {}) });
//#endregion
export { SplitComponent as component };
