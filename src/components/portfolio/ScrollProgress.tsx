import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      style={{
        scaleX: x,
        transformOrigin: "0% 50%",
        background:
          "linear-gradient(90deg, var(--accent), var(--accent-2) 35%, var(--accent-5) 60%, var(--accent-3) 100%)",
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60]"
    />
  );
}
