import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ParticleText } from "./ParticleText";
import { useIsDark } from "@/hooks/use-is-dark";
import { cssVarToHex } from "@/lib/css-color";

/**
 * Loader - the intro curtain. The wordmark assembles itself out of a particle
 * field, holds for a beat, then lifts to reveal the page.
 *
 * It renders on the server as well as the client so the first paint is the
 * curtain rather than a flash of hero, which means the dismissal has to be
 * driven by a timer rather than a load event. The timings below mirror the
 * ParticleText props: stagger + gatherDuration is when the last particle
 * lands, and HOLD is the pause after that.
 */

const GATHER_DURATION = 1400;
const STAGGER = 340;
const HOLD = 620;

// Baked equivalents of the ink/accent tokens, used if the runtime read fails.
const FALLBACK = {
  light: { ink: "#2b2724", accent: "#5d55c6" },
  dark: { ink: "#eae7e2", accent: "#a29bff" },
};

export function Loader() {
  const reduce = useReducedMotion();
  const isDark = useIsDark();
  const [done, setDone] = useState(false);
  const [palette, setPalette] = useState(FALLBACK.light);
  const [wide, setWide] = useState(true);

  // The wordmark is sampled as a single unwrapped line, so on a narrow screen
  // the full phrase shrinks to the point where the glyphs stop reading as
  // letters. Phones get the name alone, at roughly twice the size.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const fallback = isDark ? FALLBACK.dark : FALLBACK.light;
    setPalette({
      ink: cssVarToHex("--ink", fallback.ink),
      accent: cssVarToHex("--accent", fallback.accent),
    });
  }, [isDark]);

  // Under reduced motion the text is placed instantly, so the curtain only
  // needs to be up long enough to read.
  useEffect(() => {
    const total = reduce ? 700 : GATHER_DURATION + STAGGER + HOLD;
    const timer = window.setTimeout(() => setDone(true), total);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  // Hold the page still underneath the curtain so it cannot be scrolled away
  // mid-animation, and start every visit at the top.
  useEffect(() => {
    if (done) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* The hero's own wash, so the curtain lifts into a matching field. */}
          <div aria-hidden className="aurora absolute inset-0 opacity-50" />

          <div className="relative w-full px-6">
            <ParticleText
              text={wide ? "Shreya Jain Portfolio" : "Shreya Jain"}
              // `inherit` samples the computed family off this element, which
              // is the only way the serif token reaches the canvas: a canvas
              // font string cannot resolve `var(--font-serif)` itself.
              className="font-serif mx-auto max-w-5xl"
              style={{ height: "min(46vh, 360px)" }}
              color={palette.ink}
              highlightColor={palette.accent}
              fontFamily="inherit"
              // Cormorant is a high-contrast serif, so the glyphs have to be
              // large before their hairlines survive sampling. An oversized
              // fontSize deliberately trips the component's fit-to-width
              // rescale, which lands the wordmark at 92% of the box at every
              // breakpoint instead of leaving it small on wide screens.
              fontWeight={700}
              fontSize={200}
              particleSize={2.4}
              density={2}
              scatter={200}
              gatherDuration={GATHER_DURATION}
              stagger={STAGGER}
              idleDrift={0.35}
              pointerRepel={34}
              repelRadius={110}
              trigger="mount"
              glow
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
