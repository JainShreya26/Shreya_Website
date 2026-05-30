import { motion, useReducedMotion } from "framer-motion";
import portrait from "@/assets/portrait-shreya.jpg";

export function Hero() {
  const reduce = useReducedMotion();

  const headlineWords = [
    { text: "Building evaluated AI systems", italic: false },
    { text: "that accelerate scientific discovery.", italic: true },
  ];

  return (
    <section
      id="top"
      className="relative px-6 md:px-10 pt-32 md:pt-36 pb-16 md:pb-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7 flex flex-col gap-3.5">
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
                className={`inline-block mr-[0.25em] ${line.italic ? "italic text-accent" : ""}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <p className="text-base leading-[1.6] text-pretty text-ink-soft max-w-[52ch]">
            I&apos;m <strong className="text-ink font-medium">Shreya Jain</strong>, a Data Scientist
            at Michigan Medicine working at the intersection of LLMs, causal
            inference, and healthcare. I build research tools that translate
            messy clinical and behavioral data into interpretable, decision‑grade
            intelligence.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-ink text-canvas text-sm py-2.5 pl-3.5 pr-4.5 rounded-full hover:bg-ink-soft transition-colors"
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

          <dl className="grid grid-cols-3 gap-6 pt-4 mt-1 border-t border-rule">
            {[
              { k: "3+", v: "Years in ML & DS" },
              { k: "6+", v: "Roles across US & India" },
              { k: "2", v: "Peer‑reviewed papers" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-serif text-xl md:text-2xl">{s.k}</dt>
                <dd className="text-[10px] uppercase tracking-[0.16em] text-muted mt-1">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 relative"
        >
          <div className="relative w-full max-w-[420px] mx-auto md:ml-auto md:mr-0">
            <div className="absolute -inset-2 border border-rule rounded-sm" aria-hidden />
            <img
              src={portrait}
              alt="Portrait of Shreya Jain"
              className="relative w-full aspect-[4/5] object-cover rounded-sm transition-all duration-700"
              loading="eager"
            />
          </div>
        </motion.figure>
      </div>

      {/* Skills marquee */}
      <div className="mt-12 md:mt-16 border-y border-rule overflow-hidden py-5 md:py-7">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[
            "Python", "PyTorch", "TensorFlow", "LangChain", "RAG", "LLMs",
            "Causal Inference", "DECI", "DoWhy", "NetworkX", "OpenCV", "MediaPipe",
            "YOLOv8", "spaCy", "LoRA", "Scikit‑learn", "SQL", "Power BI", "Tableau",
            "R", "Time Series", "NLP", "Computer Vision",
          ].map((s, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-5 font-serif text-xl md:text-2xl"
            >
              <span className={i % 3 === 1 ? "italic text-ink" : "text-ink-soft/60"}>{s}</span>
              <span className="font-mono text-[10px] text-muted">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
