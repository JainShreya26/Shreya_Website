import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import LiquidEther from "./LiquidEther";

/**
 * HeroFluid — the hero's ambient background: an animated, interactive version
 * of the `.aurora` wash, driven by the LiquidEther fluid sim.
 *
 * Design intent is restraint. The stock React Bits demo is a full-bleed neon
 * sim; that would fight an editorial serif layout on warm paper. So:
 *  - the palette is the site's own accents (teal → indigo → coral), the same
 *    three used by `.aurora` and `.text-gradient`, not the stock purple/pink;
 *  - it's masked to bloom behind the portrait in the upper right and fall away
 *    across the headline, so type always sits on clean canvas;
 *  - it multiplies into the paper in light mode and screens in dark, so it
 *    reads as pigment rather than a glowing screen;
 *  - motion is slowed and softened well below the demo defaults.
 *
 * Falls back to the static `.aurora` gradient for reduced motion, on small
 * screens, and if WebGL is unavailable — the hero keeps its colour either way.
 */

// Baked equivalents of the accent tokens, used if the runtime read fails.
const FALLBACK = {
  light: ["#008c99", "#5d55c6", "#d24c4c"],
  dark: ["#3ebfc6", "#a29bff", "#f47c6b"],
};

/**
 * three's Color parser handles hex/rgb/hsl but not `oklch()`, which is how this
 * theme defines every accent. A 1×1 canvas does the conversion for us: it
 * accepts any CSS colour the browser understands and hands back sRGB bytes.
 */
function resolveAccents(isDark: boolean): string[] {
  const fallback = isDark ? FALLBACK.dark : FALLBACK.light;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return fallback;
    const styles = getComputedStyle(document.documentElement);
    return ["--accent-2", "--accent", "--accent-3"].map((token, i) => {
      const value = styles.getPropertyValue(token).trim();
      if (!value) return fallback[i];
      ctx.fillStyle = "#000";
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      if (r === 0 && g === 0 && b === 0) return fallback[i]; // unparsed
      return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
    });
  } catch {
    return fallback;
  }
}

/** Tracks the `dark` class that Nav toggles on <html>. */
function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

// Blooms behind the portrait, thins out across the headline, gone before the
// skills marquee — so the fluid never competes with text.
const MASK =
  "radial-gradient(78% 72% at 72% 34%, #000 0%, rgba(0,0,0,0.9) 26%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,0.16) 70%, transparent 84%)";

export function HeroFluid() {
  const reduce = useReducedMotion();
  const isDark = useIsDark();
  const [colors, setColors] = useState<string[]>(FALLBACK.light);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setColors(resolveAccents(isDark));
  }, [isDark]);

  // Client-only, and only where the sim earns its cost: the hero stacks on
  // small screens and there's no pointer to drive it, so phones get the static
  // wash instead of a fluid sim burning battery behind the fold.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const showFluid = enabled && !reduce;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      {/* Static base — the fallback on its own, and a faint floor under the sim. */}
      <div
        className={`aurora absolute inset-0 transition-opacity duration-700 ${
          showFluid ? "opacity-30" : "opacity-100"
        }`}
      />

      {showFluid && (
        <LiquidEther
          colors={colors}
          className="absolute inset-0 opacity-65 mix-blend-multiply dark:opacity-80 dark:mix-blend-screen"
          style={{ filter: "blur(14px) saturate(1.05)" }}
          // Softer and slower than the demo defaults: a broad brush at low
          // force drifts, where a small brush at high force splashes.
          mouseForce={13}
          cursorSize={150}
          resolution={0.38}
          // Without this the field saturates into a flat colour slab after a
          // couple of seconds of pointer movement; this lets it breathe.
          dissipation={0.972}
          iterationsPoisson={24}
          isViscous={false}
          BFECC
          autoDemo
          autoSpeed={0.26}
          autoIntensity={1.5}
          autoRampDuration={1.4}
          takeoverDuration={0.45}
          autoResumeDelay={2600}
        />
      )}
    </div>
  );
}
