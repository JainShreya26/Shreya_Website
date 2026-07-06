import { Reveal } from "./Reveal";

const papers = [
  {
    badge: "ACM 2023",
    title:
      "Offer and Deal‑Quality Prediction using Machine Learning and a Fuzzy Approach: A Shark Tank India Case Study",
    authors: "Shreya Jain, Atharva Parikh",
    venue: "Proceedings of the ACM Web Conference 2023",
    href: "https://dl.acm.org/doi/abs/10.1145/3590837.3590891",
  },
  {
    badge: "IEEE 2024",
    title:
      "Empowering India's Climate Action: Harnessing Blockchain for Carbon Trading",
    authors: "Shreya Jain, Atharva Parikh, Riddhi Pawar, Shruti Jawale",
    venue:
      "2024 IEEE International Conference on Blockchain and Distributed Systems Security (ICBDS)",
    href: "https://ieeexplore.ieee.org/document/10837382",
  },
];

export function Research() {
  return (
    <section id="research" className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-ink text-canvas rounded-2xl p-10 md:p-16 lg:p-20 grain">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
            style={{ background: "color-mix(in oklab, var(--accent) 60%, transparent)" }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12">
            <Reveal className="md:col-span-4">
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-canvas/50 mb-5">
                05 / Publications
              </h2>
              <p className="font-serif text-3xl md:text-4xl leading-tight text-balance">
                Peer‑reviewed work at the <span className="italic">edges</span>
                {" "}of ML, fuzzy systems, and applied research.
              </p>
              <p className="mt-6 text-sm text-canvas/60 max-w-xs">
                Published in international venues with collaborators across
                India and the US.
              </p>
            </Reveal>

            <ol className="md:col-span-8 flex flex-col">
              {papers.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.12}>
                  <li className="border-t border-canvas/10 first:border-t-0 py-10 first:pt-0 group">
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                        style={{
                          color: i === 0 ? "var(--accent-4)" : "var(--accent-2)",
                          background: `color-mix(in oklab, ${i === 0 ? "var(--accent-4)" : "var(--accent-2)"} 16%, transparent)`,
                        }}
                      >
                        {p.badge}
                      </span>
                      <span className="text-[10px] font-mono text-canvas/40">
                        0{i + 1} / 0{papers.length}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-canvas leading-snug text-balance">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-canvas/70">
                      <strong className="text-canvas font-medium">Shreya Jain</strong>
                      {p.authors.replace("Shreya Jain", "")}
                    </p>
                    <p className="mt-1 text-sm italic text-canvas/60">{p.venue}</p>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm text-canvas border-b border-canvas/30 hover:border-canvas pb-0.5 transition-colors"
                    >
                      Read paper
                      <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                    </a>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
