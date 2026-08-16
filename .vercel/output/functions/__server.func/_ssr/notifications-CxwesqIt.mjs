import { t as supabase } from "./client-C9b7jjpj.mjs";
import { d as cn, t as Button } from "./logo-DKea5PPW.mjs";
import { M as require_jsx_runtime } from "./server-DVY_7xHe.mjs";
import { c as useQueryClient } from "./router-C6_53GK8.mjs";
import { t as useQuery } from "./useQuery-CY1U8zPp.mjs";
import { t as Badge } from "./badge-Cd0gzHdf.mjs";
import { t as Skeleton } from "./skeleton-C5JQaj4b.mjs";
import { i as myNotificationsQuery } from "./queries-CUXl3ju3.mjs";
import { n as CustomerLayout, t as Bell } from "./CustomerLayout-BzHiSlH4.mjs";
import { t as EmptyState } from "./EmptyState-DO_ROLMb.mjs";
import { t as RequireAuth } from "./RequireAuth-CesbTmf8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-CxwesqIt.js
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const { data, isLoading } = useQuery(myNotificationsQuery);
	const queryClient = useQueryClient();
	const markAllRead = async () => {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return;
		await supabase.from("notifications").update({ is_read: true }).eq("user_id", auth.user.id);
		queryClient.invalidateQueries({ queryKey: ["notifications"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Notifications"
			}), data && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: markAllRead,
				children: "Mark all read"
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-20 rounded-2xl" }, i))
		}) : data && data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 space-y-3",
			children: data.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: cn("surface-card p-4", !n.is_read && "border-primary/40 bg-secondary/40"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: n.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: new Date(n.created_at).toLocaleString("en-IN")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "rounded-full capitalize",
						children: n.type
					})]
				})
			}, n.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Bell,
				title: "No notifications",
				description: "You're all caught up. Order updates and offers will appear here.",
				actionLabel: "Shop Products",
				actionTo: "/products"
			})
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPage, {}) }) });
//#endregion
export { SplitComponent as component };
