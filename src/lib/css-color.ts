/**
 * Canvas colour helpers.
 *
 * Every accent in this theme is declared in `oklch()`, which neither three's
 * Color parser nor a canvas particle fill can consume directly. A 1x1 canvas
 * does the conversion for us: it accepts any CSS colour the browser
 * understands and hands back sRGB bytes.
 */
export function cssVarToHex(token: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return fallback;

    const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    if (!value) return fallback;

    ctx.fillStyle = "#000";
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    if (r === 0 && g === 0 && b === 0) return fallback; // unparsed
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  } catch {
    return fallback;
  }
}
