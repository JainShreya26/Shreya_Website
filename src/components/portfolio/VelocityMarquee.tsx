import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

const hues = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-3)",
  "var(--accent-5)",
  "var(--accent-4)",
];

function Row({ items }: { items: string[] }) {
  // Each copy is identical, so the marquee loops seamlessly when shifted by
  // exactly one copy width.
  return (
    <span className="flex shrink-0 items-center" aria-hidden>
      {items.map((s, i) => {
        const highlight = i % 3 === 1;
        return (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-5 font-serif text-xl md:text-2xl"
          >
            <span
              className={highlight ? "italic" : "text-ink-soft/55"}
              style={highlight ? { color: hues[i % hues.length] } : undefined}
            >
              {s}
            </span>
            <span className="font-mono text-[10px] text-muted">/</span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * VelocityMarquee - a continuously drifting strip whose speed and direction
 * respond to scroll velocity: scroll down and it races ahead, scroll up and
 * it reverses, sit still and it idles. Gives the page a tactile, scroll-aware
 * feel. Falls back to a static, readable row under reduced-motion.
 */
export function VelocityMarquee({
  items,
  baseVelocity = 0.75,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Map raw scroll velocity into a bounded multiplier on the base drift. Kept
  // low so the strip reads as an ambient drift rather than a ticker.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], {
    clamp: false,
  });

  // Four copies; wrap over exactly one copy (25%) for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef(-1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Scroll direction nudges the marquee direction.
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  if (reduce) {
    return (
      <div className="flex overflow-hidden whitespace-nowrap">
        <Row items={items} />
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x }}>
        <Row items={items} />
        <Row items={items} />
        <Row items={items} />
        <Row items={items} />
      </motion.div>
    </div>
  );
}
