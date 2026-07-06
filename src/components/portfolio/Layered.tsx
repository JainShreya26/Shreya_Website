import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Layered — wraps a section so that as the user scrolls past it,
 * the section subtly recedes (scale + opacity + slight y-shift),
 * giving the impression that the next section slides up over it.
 * Layout, spacing, and typography are untouched.
 */
export function Layered({
  children,
  className = "",
  id,
  overlap = false,
  z = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Rounds the top and pulls the panel up so it slides over the previous one. */
  overlap?: boolean;
  /** Stacking order — higher panels ride over lower ones during the overlap. */
  z?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Outgoing recede — only kicks in once the section starts leaving the top.
  // Keep opacity high so content stays legible even on the last section
  // (where the page may rest mid-transition).
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, reduce ? 1 : 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, reduce ? 1 : 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.7, 1], [0, 0, reduce ? 0 : -20]);

  return (
    <div
      ref={ref}
      id={id}
      className={`relative ${overlap ? "-mt-7 md:-mt-14" : ""} ${className}`}
      style={{ willChange: "transform", zIndex: z }}
    >
      <motion.div
        style={reduce ? undefined : { scale, opacity, y }}
        className={`relative bg-canvas ${
          overlap
            ? "rounded-t-[1.75rem] md:rounded-t-[2.75rem] shadow-[0_-26px_56px_-40px_rgba(0,0,0,0.45)]"
            : ""
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
}