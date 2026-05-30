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
}: {
  children: ReactNode;
  className?: string;
  id?: string;
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
      className={`relative ${className}`}
      style={{ willChange: "transform" }}
    >
      <motion.div
        style={reduce ? undefined : { scale, opacity, y }}
        className="relative bg-canvas"
      >
        {children}
      </motion.div>
    </div>
  );
}