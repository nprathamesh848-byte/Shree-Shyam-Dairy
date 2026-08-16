import lassiImg from "@/assets/lassi.jpg";
import gheeImg from "@/assets/ghee.jpg";

const MAP: Array<[RegExp, string]> = [
  [
    /paneer/i,
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=70",
  ],
  [/ghee/i, gheeImg],
  [/butter\s*milk|chaas/i, lassiImg],
  [
    /butter/i,
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=70",
  ],
  [
    /cheese/i,
    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=70",
  ],
  [
    /curd|yog|dahi/i,
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=70",
  ],
  [/lassi/i, lassiImg],
  [
    /flavour|chocolate|kesar/i,
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=70",
  ],
  [
    /milk/i,
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=70",
  ],
];

const FALLBACK =
  "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=70";

export function productImage(name: string): string {
  for (const [re, url] of MAP) if (re.test(name)) return url;
  return FALLBACK;
}

export function categoryImage(name: string): string {
  return productImage(name);
}
