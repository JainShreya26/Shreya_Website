import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        <Reveal className="md:col-span-7">
          <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted mb-8">
            01 / About
          </h2>
          <p className="font-serif text-3xl md:text-5xl leading-[1.15] text-balance">
            I work where{" "}
            <span className="italic text-accent">machine learning</span> meets
            human consequences — clinical decisions, behavioral data, scientific
            inference. My favourite problems are the ones where{" "}
            <span className="italic">why</span> matters as much as{" "}
            <span className="italic">what</span>.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-8 text-ink-soft leading-relaxed">
            <p>
              Today I'm a Data Scientist at Michigan Medicine, building
              domain‑specific RAG systems and causal extraction pipelines that
              help researchers reason over thousands of papers and unstructured
              clinical text.
            </p>
            <p>
              Before Ann Arbor, I shipped pose‑estimation systems for the Indian
              Ministry of Defence, OCR/NLP invoice automation for an Irish
              travel firm, and reinforcement‑learning patient engagement studies
              with UM Precision Health.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-5 md:pl-8 md:border-l border-rule">
          <dl className="space-y-7">
            {[
              ["Based in", "Ann Arbor, MI · open to relocation"],
              ["Currently", "Data Scientist, Michigan Medicine"],
              ["Education", "MS Data Science, University of Michigan"],
              ["Focus areas", "LLMs · RAG · Causal Inference · Machine Learning · Data Analysis"],
              ["Recognition", "Ross Hackathon ’24 & ’25 · TAMU Healthcare Hackathon"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 pb-7 border-b border-rule last:border-0">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                <dd className="col-span-2 text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
