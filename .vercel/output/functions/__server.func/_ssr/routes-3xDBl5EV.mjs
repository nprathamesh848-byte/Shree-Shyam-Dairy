import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./logo-BmbwPOq5.mjs";
import { o as contactWhatsAppUrl, s as inr, t as BUSINESS } from "./business-U2QbWJX3.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as ArrowRight, B as Heart, D as MessageCircle, E as Milk, P as Leaf, Q as BadgeIndianRupee, d as Sparkles, i as Truck, m as ShieldCheck, u as Star, v as Quote } from "../_libs/lucide-react.mjs";
import { t as Skeleton } from "./skeleton-Z3CvlVhe.mjs";
import { t as CustomerLayout } from "./CustomerLayout-BABXZNCw.mjs";
import { l as productsQuery, s as offersQuery, t as categoriesQuery } from "./queries-2vMK7IUA.mjs";
import { t as categoryImage } from "./product-images-Cq-6b_2J.mjs";
import { t as ProductCard } from "./ProductCard-CKc2B_hD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-3xDBl5EV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_dairy_bright_default = "/assets/hero-dairy-bright-BloKvrJo.jpg";
/** Lightweight scroll reveal that respects prefers-reduced-motion. */
function Reveal({ children, className, delay = 0, as: Tag = "div" }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(true);
			return;
		}
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setShown(true);
				io.disconnect();
			}
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .05
		});
		io.observe(node);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		ref,
		style: { transitionDelay: `${delay}ms` },
		className: cn("transition-all duration-700 ease-out motion-reduce:transition-none", shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0", className),
		children
	});
}
/** Soft pastel identity per dairy category (design-only helper). */
var STYLES = [
	[/butter\s*milk|chaas/i, "bg-[oklch(0.95_0.03_230)]"],
	[/butter/i, "bg-[oklch(0.96_0.05_95)]"],
	[/milk/i, "bg-[oklch(0.95_0.03_240)]"],
	[/curd|yog|dahi/i, "bg-[oklch(0.95_0.035_150)]"],
	[/paneer/i, "bg-[oklch(0.96_0.025_80)]"],
	[/lassi/i, "bg-[oklch(0.95_0.035_10)]"],
	[/ghee/i, "bg-[oklch(0.95_0.055_85)]"],
	[/cheese/i, "bg-[oklch(0.96_0.05_100)]"]
];
function categoryTint(name) {
	for (const [re, cls] of STYLES) if (re.test(name)) return cls;
	return "bg-[oklch(0.96_0.02_120)]";
}
var TRUST = [
	{
		icon: Leaf,
		title: "Fresh Every Day",
		text: "Fresh dairy products, prepared daily."
	},
	{
		icon: Truck,
		title: "Fast Delivery",
		text: "Delivered right to your doorstep."
	},
	{
		icon: BadgeIndianRupee,
		title: "Cash on Delivery",
		text: "Pay when your order arrives."
	},
	{
		icon: MessageCircle,
		title: "WhatsApp Ordering",
		text: "Easy ordering through WhatsApp."
	}
];
var WHY = [
	{
		icon: Milk,
		title: "Fresh Products",
		text: "Dairy prepared and delivered with care."
	},
	{
		icon: Leaf,
		title: "Quality First",
		text: "Quality products for your family."
	},
	{
		icon: Truck,
		title: "Reliable Delivery",
		text: "Get your order delivered conveniently."
	},
	{
		icon: Heart,
		title: "Trusted Local Dairy",
		text: "Serving the local community with care."
	}
];
var STEPS = [
	{
		n: "01",
		title: "Choose Products",
		text: "Browse fresh dairy products."
	},
	{
		n: "02",
		title: "Add to Cart",
		text: "Select your preferred quantity."
	},
	{
		n: "03",
		title: "Place Order",
		text: "Checkout using Cash on Delivery."
	},
	{
		n: "04",
		title: "Receive Your Order",
		text: "Get fresh products at your doorstep."
	}
];
var REVIEWS = [
	{
		name: "Rahul Patil",
		initials: "RP",
		rating: 5,
		text: "Fresh milk and paneer every time. Very convenient ordering on WhatsApp."
	},
	{
		name: "Sneha Kulkarni",
		initials: "SK",
		rating: 5,
		text: "The curd is thick and tasty, exactly like homemade. Delivery is always on time."
	},
	{
		name: "Amit Jadhav",
		initials: "AJ",
		rating: 4,
		text: "Good quality ghee and butter at fair prices. Cash on delivery makes it simple."
	}
];
function SectionHead({ title, subtitle, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl font-bold sm:text-3xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: subtitle
		})] }), to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "shrink-0 text-sm font-semibold text-primary",
			children: "View all"
		}) : null]
	});
}
function Home() {
	const categories = useQuery(categoriesQuery);
	const products = useQuery(productsQuery());
	const offers = useQuery(offersQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CustomerLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "hero-gradient",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rise-in inline-flex items-center gap-2 rounded-full bg-background px-3.5 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5" }), " Farm Fresh • Daily Delivery"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "rise-in mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl",
						style: { animationDelay: "80ms" },
						children: [
							"Fresh Dairy",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Delivered Daily!"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise-in mt-4 max-w-md text-base text-muted-foreground",
						style: { animationDelay: "160ms" },
						children: "Pure, healthy & delicious dairy products delivered fresh to your doorstep."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rise-in mt-7 flex flex-wrap gap-3",
						style: { animationDelay: "240ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "rounded-full px-7 shadow-[var(--shadow-soft)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/products",
								children: ["Shop Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							className: "rounded-full border-primary bg-background px-7 text-primary hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/offers",
								children: "View Offers"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground",
						children: [
							{
								icon: Truck,
								label: "Free delivery above ₹500"
							},
							{
								icon: BadgeIndianRupee,
								label: "Cash on delivery"
							},
							{
								icon: MessageCircle,
								label: `WhatsApp orders: ${BUSINESS.phone}`
							}
						].map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rise-in flex items-center gap-1.5",
							style: { animationDelay: `${320 + i * 90}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-4 w-4 text-primary" }),
								" ",
								b.label
							]
						}, b.label))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "float-slow absolute -left-3 top-6 z-10 hidden rounded-2xl bg-background/95 px-4 py-2.5 shadow-[var(--shadow-lift)] sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Today's milk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-bold",
								children: "100% Fresh Cow Milk"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_dairy_bright_default,
							alt: "Fresh milk, paneer, curd, butter and ghee from Shree Shyam Dairy",
							width: 1280,
							height: 1024,
							className: "rise-in w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "float-slow absolute -bottom-4 right-4 z-10 hidden items-center gap-2 rounded-2xl bg-background/95 px-4 py-2.5 shadow-[var(--shadow-lift)] sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold",
								children: "Pure & hygienic"
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: TRUST.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card flex h-full items-start gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold",
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t.text
						})] })]
					})
				}, t.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Shop by Category",
				subtitle: "Fresh favorites for every family",
				to: "/products"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
				children: categories.isLoading ? Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-36 rounded-3xl" }, i)) : categories.data?.filter((c) => c.status).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 45,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/products",
						search: {
							category: c.slug,
							q: void 0
						},
						className: `group flex h-full flex-col items-center gap-3 rounded-3xl border border-border p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${categoryTint(c.name)}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full overflow-hidden rounded-2xl bg-background/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image || categoryImage(c.name),
								alt: c.name,
								loading: "lazy",
								onError: (e) => {
									e.currentTarget.src = categoryImage(c.name);
								},
								className: "h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pb-1 text-sm font-semibold",
							children: c.name
						})]
					})
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Popular Products",
				subtitle: "Fresh picks loved by our customers",
				to: "/products"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: products.isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-3xl" }, i)) : products.data?.slice(0, 8).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 50,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
				}, p.id))
			})]
		}),
		offers.data && offers.data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				title: "Fresh Offers For You",
				subtitle: "Save more on every dairy order",
				to: "/offers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: offers.data.slice(0, 3).map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 70,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card flex h-full flex-col gap-2 bg-accent/10 p-5 transition-transform duration-300 hover:-translate-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl font-bold text-primary",
								children: o.discount_type === "percentage" ? `${Number(o.discount_value)}% OFF` : `${inr(o.discount_value)} OFF`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: o.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: o.description
							}),
							o.coupon_code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 w-fit rounded-full border border-dashed border-primary px-3 py-1 text-xs font-bold tracking-wider text-primary",
								children: o.coupon_code
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-auto w-fit rounded-full px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products",
									children: "Shop Now"
								})
							})
						]
					})
				}, o.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-col items-start gap-5 bg-secondary p-8 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold",
							children: "Need Help With Your Order?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-lg text-sm text-muted-foreground",
							children: "Order directly through WhatsApp and we'll help you with your dairy requirements."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm font-semibold",
							children: BUSINESS.phone
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "rounded-full px-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: contactWhatsAppUrl(),
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-4 w-4" }), " Order on WhatsApp"]
					})
				})]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "cream-section py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-center font-display text-2xl font-bold sm:text-3xl",
					children: [
						"Why Choose ",
						BUSINESS.name,
						"?"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: WHY.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card h-full p-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(w.icon, { className: "h-7 w-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display text-lg font-bold",
									children: w.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: w.text
								})
							]
						})
					}, w.title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center font-display text-2xl font-bold sm:text-3xl",
				children: "How It Works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-16 top-7 hidden border-t border-dashed border-border lg:block" }), STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background font-display text-lg font-bold text-primary shadow-[var(--shadow-soft)]",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: s.text
							})
						]
					})
				}, s.n))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border cream-section p-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Our promise"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-bold",
						children: "Freshness You Can Trust"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-muted-foreground",
						children: "From our dairy to your doorstep. Milk, curd, paneer and lassi prepared every morning and delivered the same day — nothing stored, nothing stale."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6 rounded-full px-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products",
							children: "Explore Products"
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						"Milk",
						"Curd",
						"Paneer",
						"Lassi"
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-hidden rounded-2xl bg-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: categoryImage(n),
							alt: `Fresh ${n.toLowerCase()}`,
							loading: "lazy",
							className: "h-32 w-full object-cover transition-transform duration-500 hover:scale-105"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-2 text-center text-sm font-semibold",
							children: n
						})]
					}, n))
				})]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center font-display text-2xl font-bold sm:text-3xl",
				children: "What Our Customers Say"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: REVIEWS.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "surface-card h-full p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-6 w-6 text-primary/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "mt-3 text-sm text-muted-foreground",
								children: r.text
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "mt-5 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary",
									children: r.initials
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex gap-0.5",
									"aria-label": `${r.rating} out of 5 stars`,
									children: Array.from({ length: 5 }).map((_, s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: s < r.rating ? "h-3.5 w-3.5 fill-accent text-accent" : "h-3.5 w-3.5 text-border" }, s))
								})] })]
							})
						]
					})
				}, r.name))
			})]
		})
	] });
}
//#endregion
export { Home as component };
