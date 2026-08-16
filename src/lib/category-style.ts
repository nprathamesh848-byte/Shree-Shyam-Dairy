/** Soft pastel identity per dairy category (design-only helper). */
const STYLES: Array<[RegExp, string]> = [
  [/butter\s*milk|chaas/i, "bg-[oklch(0.95_0.03_230)]"],
  [/butter/i, "bg-[oklch(0.96_0.05_95)]"],
  [/milk/i, "bg-[oklch(0.95_0.03_240)]"],
  [/curd|yog|dahi/i, "bg-[oklch(0.95_0.035_150)]"],
  [/paneer/i, "bg-[oklch(0.96_0.025_80)]"],
  [/lassi/i, "bg-[oklch(0.95_0.035_10)]"],
  [/ghee/i, "bg-[oklch(0.95_0.055_85)]"],
  [/cheese/i, "bg-[oklch(0.96_0.05_100)]"],
];

export function categoryTint(name: string): string {
  for (const [re, cls] of STYLES) if (re.test(name)) return cls;
  return "bg-[oklch(0.96_0.02_120)]";
}
