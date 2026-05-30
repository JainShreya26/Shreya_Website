const skills = [
  "Python", "PyTorch", "TensorFlow", "LangChain", "RAG", "LLMs",
  "Causal Inference", "DECI", "DoWhy", "NetworkX", "OpenCV", "MediaPipe",
  "YOLOv8", "spaCy", "LoRA", "Scikit‑learn", "SQL", "Power BI", "Tableau",
  "R", "Time Series", "NLP", "Computer Vision",
];

export function Marquee() {
  return (
    <section
      id="skills"
      aria-label="Tools and methods"
      className="border-y border-rule overflow-hidden bg-canvas-alt/40 py-8"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...skills, ...skills].map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-10 px-6 font-serif text-3xl md:text-4xl"
          >
            <span className={i % 3 === 1 ? "italic text-ink" : "text-ink-soft/60"}>{s}</span>
            <span className="font-mono text-xs text-muted">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
