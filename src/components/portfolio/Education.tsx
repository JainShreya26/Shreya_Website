import { Reveal } from "./Reveal";

const schools = [
  {
    school: "University of Michigan",
    degree: "Master's in Data Science (Statistics)",
    location: "Ann Arbor, MI · Aug 2023 – May 2025",
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
    notes:
      "Event Head — CodeChef & TEDxVIIT · Finance / Sponsorship Lead · Sports Club Representative.",
    courses: [
      "Machine Learning & AI",
      "Discrete Mathematics",
      "OS & Networking",
      "Data Structures & Algorithms",
      "C / C++ / Java / JS / PHP",
      "Object‑Oriented Programming",
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
          <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted mb-5">
            04 / Education
          </h2>
          <p className="font-serif text-3xl md:text-4xl leading-tight">
            Trained in <span className="italic">statistics</span>, raised on
            engineering.
          </p>
        </Reveal>
        <div className="md:col-span-8 space-y-12">
          {schools.map((s, i) => (
            <Reveal key={s.school} delay={i * 0.1}>
              <article className="grid sm:grid-cols-12 gap-6 pb-12 border-b border-rule last:border-0">
                <div className="sm:col-span-5">
                  <h3 className="font-serif text-2xl">{s.school}</h3>
                  <p className="text-ink-soft mt-1">{s.degree}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted mt-2">
                    {s.location}
                  </p>
                </div>
                <div className="sm:col-span-7 space-y-4">
                  <p className="text-ink-soft leading-relaxed">{s.notes}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink-soft">
                    {s.courses.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-muted font-mono">·</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
