import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./useAuth-C45ONHlH.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmptyState-zsqcacva.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border cream-section px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-8 w-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted-foreground",
				children: description
			}),
			actionLabel && actionTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6 rounded-full px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: actionTo,
					children: actionLabel
				})
			}) : null
		]
	});
}
//#endregion
export { EmptyState as t };
