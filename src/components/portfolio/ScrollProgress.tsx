import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.2 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[60]"
    />
  );
}
