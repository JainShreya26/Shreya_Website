import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

const schools = [
  {
    school: "University of Michigan",
    degree: "Master's in Data Science (Statistics)",
    location: "Ann Arbor, MI · Aug 2023 - May 2025",
    level: "Graduate",
    notes:
      "GSI with tuition waiver (SI 649) · Ross Hackathon ’24 & ’25 · TAMU Healthcare Hackathon.",
    courses: [
      "Probability & Distribution Theory",
      "Statistical Inference I & II",
      "Machine Learning & Regression",
      "Time Series Analysis",
      "Causal Inference",
      "Data Analytics & Visualization",
    ],
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "B.Tech, Information Technology (VIIT)",
    location: "Pune, India",
    level: "Undergraduate",
    notes:
      "Event Head - CodeChef & TEDxVIIT · Finance / Sponsorship Lead · Sports Club Representative.",
    courses: [
      "Machine Learning & AI",
      "Discrete Mathematics",
      "OS & Networking",
      "Data Structures & Algorithms",
      "C / C++ / Java / JS / PHP",
      "Object-Oriented Programming",
    ],
  },
];

export function Education() {
  return (
    <section
      id="education"
      className="px-6 md:px-10 py-28 md:py-40 bg-canvas-alt/40 border-y border-rule"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-4">
          <h2 className="text-[11px] uppercase tracking-[0.22em] text-accent mb-5">
            04 / Education
          </h2>
          <p className="font-serif text-3xl md:text-4xl leading-tight">
            Trained in <span className="italic text-accent">statistics</span>, raised on
            engineering.
          </p>
        </Reveal>

        <div className="md:col-span-8 space-y-7">
          {schools.map((s, i) => (
            <Reveal key={s.school} delay={i * 0.1}>
              <article
                style={{ "--c": i === 0 ? "var(--accent)" : "var(--accent-2)" } as CSSProperties}
                className="group relative overflow-hidden rounded-2xl border border-rule p-6 md:p-8 transition-shadow duration-300 hover:shadow-[0_18px_40px_-26px_var(--c)]"
              >
                {/* tinted wash */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "color-mix(in oklab, var(--c) 6%, transparent)" }}
                />

                <div className="relative grid gap-6 sm:grid-cols-12">
                  <div className="sm:col-span-5">
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                      style={{
                        color: "var(--c)",
                        background: "color-mix(in oklab, var(--c) 14%, transparent)",
                      }}
                    >
                      {s.level}
                    </span>
                    <h3 className="font-serif text-2xl leading-snug">{s.school}</h3>
                    <p className="mt-1 font-medium" style={{ color: "var(--c)" }}>
                      {s.degree}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted mt-2">
                      {s.location}
                    </p>
                  </div>

                  <div className="sm:col-span-7 space-y-4">
                    <p className="text-ink-soft leading-relaxed">{s.notes}</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.courses.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border px-3 py-1 text-[12.5px] text-ink-soft transition-colors"
                          style={{
                            borderColor: "color-mix(in oklab, var(--c) 28%, transparent)",
                            background: "color-mix(in oklab, var(--c) 8%, transparent)",
                          }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
