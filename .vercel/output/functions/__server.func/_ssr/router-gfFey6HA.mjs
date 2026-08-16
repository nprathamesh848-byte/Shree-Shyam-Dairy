import { i as __toESM, n as __exportAll } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DwZI7IQl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "ssd-cart-v1";
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [items, ready]);
	const addItem = (0, import_react.useCallback)((item, quantity = 1) => {
		setItems((prev) => {
			if (prev.find((i) => i.variantId === item.variantId)) return prev.map((i) => i.variantId === item.variantId ? {
				...i,
				...item,
				quantity: Math.min(i.quantity + quantity, Math.max(item.stock, 1))
			} : i);
			return [...prev, {
				...item,
				quantity
			}];
		});
	}, []);
	const setQuantity = (0, import_react.useCallback)((variantId, quantity) => {
		setItems((prev) => quantity <= 0 ? prev.filter((i) => i.variantId !== variantId) : prev.map((i) => i.variantId === variantId ? {
			...i,
			quantity
		} : i));
	}, []);
	const removeItem = (0, import_react.useCallback)((variantId) => {
		setItems((prev) => prev.filter((i) => i.variantId !== variantId));
	}, []);
	const clear = (0, import_react.useCallback)(() => setItems([]), []);
	const value = (0, import_react.useMemo)(() => ({
		items,
		ready,
		count: items.reduce((s, i) => s + i.quantity, 0),
		subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
		addItem,
		setQuantity,
		removeItem,
		clear
	}), [
		items,
		ready,
		addItem,
		setQuantity,
		removeItem,
		clear
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/order-success._orderNumber-DK84C8WJ.js
var $$splitComponentImporter$24 = () => import("./order-success._orderNumber-RcP_nFoB.mjs");
var Route$25 = createFileRoute("/order-success/$orderNumber")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Order Placed — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Your cash on delivery order has been received."
		},
		{
			property: "og:title",
			content: "Order Placed — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Your cash on delivery order has been received."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-BFcwH8_R.js
var $$splitComponentImporter$23 = () => import("./orders._id-DQ9-uYAi.mjs");
var Route$24 = createFileRoute("/orders/$id")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Order Details — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Track the status of your dairy order."
		},
		{
			property: "og:title",
			content: "Order Details — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Track the status of your dairy order."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/products._id-BszCt1YQ.js
var $$splitComponentImporter$22 = () => import("./products._id-DzVXPhMT.mjs");
var Route$23 = createFileRoute("/products/$id")({
	head: () => ({ meta: [
		{ title: "Product Details — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Fresh dairy product details, variants, pricing and stock."
		},
		{
			property: "og:title",
			content: "Product Details — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Fresh dairy product details, variants and pricing."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-DqHqN1SK.js
var $$splitComponentImporter$21 = () => import("./products.index-CgytlOEI.mjs");
var Route$22 = createFileRoute("/products/")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" && search["q"] ? search["q"] : void 0,
		category: typeof search["category"] === "string" && search["category"] ? search["category"] : void 0
	}),
	head: () => ({ meta: [
		{ title: "Fresh Cow Milk | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Browse fresh milk, curd, paneer, lassi, buttermilk, butter, ghee and cheese."
		},
		{
			property: "og:title",
			content: "All Dairy Products — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Browse our full range of fresh dairy products."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-gfFey6HA.js
var router_gfFey6HA_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var styles_default = "/assets/styles-NwuWS1Nl.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$21 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Shree Shyam Dairy — Fresh Dairy Delivered Daily" },
			{
				name: "description",
				content: "Fresh dairy products delivered to your doorstep."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "Shree Shyam Dairy — Fresh Dairy Delivered Daily"
			},
			{
				property: "og:description",
				content: "Fresh dairy products delivered to your doorstep."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$21.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$20 = () => import("./routes-BM1eeeAy.mjs");
var Route$20 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Shree Shyam Dairy — Fresh Dairy Delivered Daily" },
		{
			name: "description",
			content: "Fresh dairy products delivered to your doorstep."
		},
		{
			property: "og:title",
			content: "Shree Shyam Dairy — Fresh Dairy Delivered Daily"
		},
		{
			property: "og:description",
			content: "Fresh dairy products delivered to your doorstep."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./cart-Cw9fFjLr.mjs");
var Route$19 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "Your Cart — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Review your dairy order before checkout."
		},
		{
			property: "og:title",
			content: "Your Cart — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Review your dairy order before checkout."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./checkout-CKAPeIuf.mjs");
var Route$18 = createFileRoute("/checkout")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Checkout — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Enter delivery details and place your cash on delivery order."
		},
		{
			property: "og:title",
			content: "Checkout — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Cash on delivery checkout for fresh dairy orders."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./login-DmmKHYFw.mjs");
var Route$17 = createFileRoute("/login")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Log In — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Log in to track your dairy orders and saved addresses."
		},
		{
			property: "og:title",
			content: "Log In — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Log in to track your dairy orders and saved addresses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./notifications-CFPQqKf3.mjs");
var Route$16 = createFileRoute("/notifications")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Notifications — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Order updates and new offers from Shree Shyam Dairy."
		},
		{
			property: "og:title",
			content: "Notifications — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Order updates and new offers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./offers-BAFz0oRI.mjs");
var Route$15 = createFileRoute("/offers")({
	head: () => ({ meta: [
		{ title: "Offers | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Live discounts on milk, paneer, lassi and more at Shree Shyam Dairy."
		},
		{
			property: "og:title",
			content: "Offers & Coupons — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Save on fresh dairy with our running offers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./signup-Bzt2BWrW.mjs");
var Route$14 = createFileRoute("/signup")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Sign Up — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Create an account for faster dairy checkout and order tracking."
		},
		{
			property: "og:title",
			content: "Sign Up — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Create an account for faster dairy checkout and order tracking."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.index-CtGhdBhC.mjs");
var Route$13 = createFileRoute("/admin/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Admin Dashboard — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Business overview for Shree Shyam Dairy."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Admin Dashboard — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Business overview for Shree Shyam Dairy."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.banners-DY6VnOpu.mjs");
var Route$12 = createFileRoute("/admin/banners")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Banners — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Manage homepage promotional banners."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Banners — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Manage homepage promotional banners."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.categories-DFOeYBII.mjs");
var Route$11 = createFileRoute("/admin/categories")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Categories — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Manage dairy product categories."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Categories — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Manage dairy product categories."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.coupons-glZ6oLoU.mjs");
var Route$10 = createFileRoute("/admin/coupons")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Coupons — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Manage discount coupon codes."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Coupons — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Manage discount coupon codes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin.customers-DlspHTcH.mjs");
var Route$9 = createFileRoute("/admin/customers")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Customers — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "View customers and their order history."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Customers — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "View customers and their order history."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.inventory-cz8B3woO.mjs");
var Route$8 = createFileRoute("/admin/inventory")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Inventory — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Track stock levels for every dairy variant."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Inventory — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Track stock levels for every dairy variant."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.offers-CudRicYd.mjs");
var Route$7 = createFileRoute("/admin/offers")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Offers — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Create promotional offers for customers."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Offers — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Create promotional offers for customers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.orders-Cyq66mXt.mjs");
var Route$6 = createFileRoute("/admin/orders")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Orders — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Manage and fulfil customer dairy orders."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Orders — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Manage and fulfil customer dairy orders."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.products-C9f89r7f.mjs");
var Route$5 = createFileRoute("/admin/products")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Products — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Create and edit dairy products and their variants."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Products — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Create and edit dairy products and their variants."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.reports-OXIyvktH.mjs");
var Route$4 = createFileRoute("/admin/reports")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Reports — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Sales and product performance reports."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Reports — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Sales and product performance reports."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.settings-jjq3YiGs.mjs");
var Route$3 = createFileRoute("/admin/settings")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Settings — Admin | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Business, delivery and contact settings."
		},
		{
			name: "robots",
			content: "noindex"
		},
		{
			property: "og:title",
			content: "Settings — Admin | Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Business, delivery and contact settings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./orders.index-BDi3R7ae.mjs");
var Route$2 = createFileRoute("/orders/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "My Orders | Shree Shyam Dairy" },
		{
			name: "description",
			content: "Track your dairy orders and delivery status."
		},
		{
			property: "og:title",
			content: "My Orders — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Track your dairy orders and delivery status."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./profile.index-tFm98yPP.mjs");
var Route$1 = createFileRoute("/profile/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "My Profile — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Manage your Shree Shyam Dairy account details."
		},
		{
			property: "og:title",
			content: "My Profile — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Manage your Shree Shyam Dairy account details."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./profile.addresses-R9GbbfaO.mjs");
var Route = createFileRoute("/profile/addresses")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "My Addresses — Shree Shyam Dairy" },
		{
			name: "description",
			content: "Save and manage your delivery addresses."
		},
		{
			property: "og:title",
			content: "My Addresses — Shree Shyam Dairy"
		},
		{
			property: "og:description",
			content: "Save and manage your delivery addresses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
objectType({
	name: stringType().trim().min(2).max(80),
	mobile: stringType().trim().regex(/^[6-9]\d{9}$/),
	address: stringType().trim().min(5).max(400),
	landmark: stringType().trim().max(120),
	city: stringType().trim().min(2).max(80),
	pincode: stringType().trim().regex(/^\d{6}$/),
	type: stringType()
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var CartRoute = Route$19.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$21
});
var CheckoutRoute = Route$18.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$21
});
var LoginRoute = Route$17.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$21
});
var NotificationsRoute = Route$16.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$21
});
var OffersRoute = Route$15.update({
	id: "/offers",
	path: "/offers",
	getParentRoute: () => Route$21
});
var SignupRoute = Route$14.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$21
});
var AdminIndexRoute = Route$13.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$21
});
var AdminBannersRoute = Route$12.update({
	id: "/admin/banners",
	path: "/admin/banners",
	getParentRoute: () => Route$21
});
var AdminCategoriesRoute = Route$11.update({
	id: "/admin/categories",
	path: "/admin/categories",
	getParentRoute: () => Route$21
});
var AdminCouponsRoute = Route$10.update({
	id: "/admin/coupons",
	path: "/admin/coupons",
	getParentRoute: () => Route$21
});
var AdminCustomersRoute = Route$9.update({
	id: "/admin/customers",
	path: "/admin/customers",
	getParentRoute: () => Route$21
});
var AdminInventoryRoute = Route$8.update({
	id: "/admin/inventory",
	path: "/admin/inventory",
	getParentRoute: () => Route$21
});
var AdminOffersRoute = Route$7.update({
	id: "/admin/offers",
	path: "/admin/offers",
	getParentRoute: () => Route$21
});
var AdminOrdersRoute = Route$6.update({
	id: "/admin/orders",
	path: "/admin/orders",
	getParentRoute: () => Route$21
});
var AdminProductsRoute = Route$5.update({
	id: "/admin/products",
	path: "/admin/products",
	getParentRoute: () => Route$21
});
var AdminReportsRoute = Route$4.update({
	id: "/admin/reports",
	path: "/admin/reports",
	getParentRoute: () => Route$21
});
var AdminSettingsRoute = Route$3.update({
	id: "/admin/settings",
	path: "/admin/settings",
	getParentRoute: () => Route$21
});
var OrderSuccessOrderNumberRoute = Route$25.update({
	id: "/order-success/$orderNumber",
	path: "/order-success/$orderNumber",
	getParentRoute: () => Route$21
});
var OrdersIndexRoute = Route$2.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => Route$21
});
var OrdersIdRoute = Route$24.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => Route$21
});
var ProductsIndexRoute = Route$22.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$21
});
var ProductsIdRoute = Route$23.update({
	id: "/products/$id",
	path: "/products/$id",
	getParentRoute: () => Route$21
});
var ProfileIndexRoute = Route$1.update({
	id: "/profile/",
	path: "/profile/",
	getParentRoute: () => Route$21
});
var rootRouteChildren = {
	IndexRoute,
	CartRoute,
	CheckoutRoute,
	LoginRoute,
	NotificationsRoute,
	OffersRoute,
	SignupRoute,
	AdminBannersRoute,
	AdminCategoriesRoute,
	AdminCouponsRoute,
	AdminCustomersRoute,
	AdminInventoryRoute,
	AdminOffersRoute,
	AdminOrdersRoute,
	AdminProductsRoute,
	AdminReportsRoute,
	AdminSettingsRoute,
	OrderSuccessOrderNumberRoute,
	OrdersIdRoute,
	ProductsIdRoute,
	ProfileAddressesRoute: Route.update({
		id: "/profile/addresses",
		path: "/profile/addresses",
		getParentRoute: () => Route$21
	}),
	AdminIndexRoute,
	OrdersIndexRoute,
	ProductsIndexRoute,
	ProfileIndexRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$25 as a, getRouter, Route$24 as i, Route$22 as n, useCart as o, Route$23 as r, router_gfFey6HA_exports as t };
