//#region node_modules/.nitro/vite/services/ssr/assets/product-images-Cq-6b_2J.js
var lassi_default = "/assets/lassi-Cr4kP3t6.jpg";
var MAP = [
	[/paneer/i, "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=70"],
	[/ghee/i, "/assets/ghee-BVa0NETv.jpg"],
	[/butter\s*milk|chaas/i, lassi_default],
	[/butter/i, "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=70"],
	[/cheese/i, "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=70"],
	[/curd|yog|dahi/i, "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=70"],
	[/lassi/i, lassi_default],
	[/flavour|chocolate|kesar/i, "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=70"],
	[/milk/i, "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=70"]
];
var FALLBACK = "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=70";
function productImage(name) {
	for (const [re, url] of MAP) if (re.test(name)) return url;
	return FALLBACK;
}
function categoryImage(name) {
	return productImage(name);
}
//#endregion
export { productImage as n, categoryImage as t };
