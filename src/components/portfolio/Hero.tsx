import { motion, useReducedMotion } from "framer-motion";
import portrait from "@/assets/portrait-shreya.jpg";
import { Parallax } from "./Parallax";
import { VelocityMarquee } from "./VelocityMarquee";
import { HeroFluid } from "./HeroFluid";

const skills = [
  "Python", "PyTorch", "TensorFlow", "LangChain", "RAG", "LLMs",
  "Causal Inference", "DECI", "DoWhy", "NetworkX", "OpenCV", "MediaPipe",
  "YOLOv8", "spaCy", "LoRA", "Scikit-learn", "SQL", "Power BI", "Tableau",
  "R", "Time Series", "NLP", "Computer Vision",
];

export function Hero() {
  const reduce = useReducedMotion();

  const headlineWords = [
    { text: "Building evaluated AI systems", italic: false },
    { text: "that accelerate scientific discovery.", italic: true },
  ];

  return (
    // Fills the viewport so the marquee lands on the fold: the skills strip is
    // the last thing visible before the reader has to scroll for About.
    <section
      id="top"
      className="relative flex min-h-svh flex-col px-6 md:px-10 pt-20 md:pt-32 overflow-hidden"
    >
      <HeroFluid />

      <div className="relative z-10 flex flex-1 items-center py-6 md:py-14">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          <div className="md:col-span-8 flex flex-col gap-3.5">
          <h1 className="font-serif text-[clamp(1.6rem,4.1vw,3.75rem)] leading-[1.05] -tracking-[0.01em] text-balance">
            {headlineWords.map((line, i) => (
              <motion.span
                key={i}
                initial={reduce ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-[0.25em] ${line.italic ? "italic text-gradient" : ""}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <p className="text-base leading-[1.6] text-pretty text-ink-soft max-w-[52ch]">
            I&apos;m <strong className="text-ink font-medium">Shreya Jain</strong>, a Data Scientist
            at Michigan Medicine working at the intersection of LLMs, causal
            inference, and healthcare. I build research tools that translate
            messy clinical and behavioral data into interpretable, decision-grade
            intelligence.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#work"
              style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))", color: "var(--accent-foreground)" }}
              className="group inline-flex items-center gap-3 text-sm py-2.5 pl-3.5 pr-4.5 rounded-full shadow-[0_10px_30px_-12px_var(--accent)] hover:shadow-[0_14px_34px_-10px_var(--accent)] transition-shadow"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-canvas/60 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-canvas" />
              </span>
              Selected work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#contact"
              className="text-sm py-2.5 px-4 rounded-full ring-1 ring-rule hover:ring-ink hover:bg-canvas-alt transition-all"
            >
              Get in touch
            </a>
          </div>

        </div>

        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 relative"
        >
          <Parallax speed={0.12} className="relative w-[200px] sm:w-[240px] md:w-full md:max-w-[300px] mx-auto md:ml-auto md:mr-0">
            {/* thin offset accent frame for depth */}
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent/35"
            />
            <img
              src={portrait}
              alt="Portrait of Shreya Jain"
              className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-[0_22px_48px_-26px_rgba(0,0,0,0.5)] ring-1 ring-rule"
              loading="eager"
            />
          </Parallax>
        </motion.figure>
        </div>
      </div>

      {/* Skills marquee - drifts with scroll velocity */}
      <div className="relative z-10 mt-auto border-y border-rule py-5 md:py-7">
        <VelocityMarquee items={skills} />
      </div>
    </section>
  );
}
