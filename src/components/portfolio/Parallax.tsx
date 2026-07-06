import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Parallax — translates its children as the element passes through the
 * viewport, so it scrolls at a different rate than the surrounding content.
 *
 * `speed` controls depth: positive values drift the element *down* relative
 * to the page (it lags behind, reading as "further back"); negative values
 * push it *up* (it leads, reading as "closer"). 0.2 is a subtle default.
 * Respects prefers-reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.2,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 when the element's top reaches the viewport bottom, 1 when its bottom
  // reaches the viewport top — i.e. progress across its full visible pass.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = speed * 120; // px of travel across the pass
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? style : { ...style, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
