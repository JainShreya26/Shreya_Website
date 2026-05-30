import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

type Role = {
  role: string;
  org: string;
  date: string;
  location: string;
  region: "us" | "india";
  bullets: string[];
  tags: string[];
};

const roles: Role[] = [
  {
    role: "Research Scientist",
    org: "Michigan Medicine",
    date: "Mar 2025 — Present",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Built a biomedical research assistant integrating Semantic Scholar, Unpaywall, OpenAI, Anthropic, Llama, and MedGemma retrieval and generation pipelines — improved citation coverage by 85%.",
      "Engineered a cross‑model ranking system benchmarking 4 LLMs on 300+ test queries, enabling data‑driven model selection.",
      "Implemented smart model routing to dynamically select lightweight models by query type, reducing token costs by 60%.",
      "Developed an LLM‑driven causal extraction system converting unstructured biomedical text into NetworkX graphs, enabling path analysis via natural‑language queries.",
      "Automated evaluation of LLM‑generated causal graphs against DECI and LiNGAM baselines using centrality metrics.",
      "Deployed the platform on Streamlit Cloud with structured logging and progress tracking, cutting debugging time by 40%.",
    ],
    tags: ["RAG", "LangChain", "DECI", "LiNGAM", "NetworkX", "Streamlit"],
  },
  {
    role: "Data Scientist & NLP",
    org: "University of Michigan",
    date: "May — Dec 2024",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Developed a Python data extraction pipeline for structured textbook content, achieving 98% extraction accuracy.",
      "Extended spaCy NER with 7 domain‑specific entity labels, improving entity recognition accuracy by 75%.",
      "Built automated data quality checks for schema validation, rule‑based consistency, and outlier detection — saving 2 hours of manual validation per dataset.",
      "Fine‑tuned GPT‑NER and Llama‑3‑8B using LoRA and quantization for NER, achieving 66% F1 on custom domain entities.",
    ],
    tags: ["Python", "spaCy", "LoRA", "Llama", "NER"],
  },
  {
    role: "Data Analyst",
    org: "University of Michigan",
    date: "Jun — Aug 2024",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Built SQL‑based data pipelines to analyze participation trends, driving interventions that increased response rates by 50%.",
      "Built real‑time Power BI dashboards to track completion metrics, reducing reporting turnaround by 60%.",
      "Designed reinforcement‑learning‑driven patient engagement games to capture behavioral data, improving retention and feeding downstream predictive models.",
    ],
    tags: ["SQL", "Power BI", "RL", "Python"],
  },
  {
    role: "Graduate Student Instructor",
    org: "SI 649 · University of Michigan",
    date: "Jun — Dec 2024",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Taught data visualization with Tableau, Plotly, Altair, D3.js, and GenAI tools.",
      "Led interactive design labs with real‑world datasets; appointment came with full tuition waiver.",
    ],
    tags: ["Tableau", "D3.js", "Altair", "Plotly"],
  },
  {
    role: "Data Science Intern",
    org: "Ministry of Defence · DRDO",
    date: "Oct 2022 — Jul 2023",
    location: "Pune, India",
    region: "india",
    bullets: [
      "Built a real‑time pose estimation system using OpenCV and MediaPipe to automate validation of 5 army drill exercises, tested on a custom 7‑subject dataset across varying heights, lighting, and distances.",
      "Engineered a YOLOv8 preprocessing pipeline with auto‑cropping, improving detection accuracy by 98% and reducing noise.",
      "Deployed an offline Flask app for the Government, replacing continuous supervision with real‑time corrective feedback.",
    ],
    tags: ["OpenCV", "MediaPipe", "YOLOv8", "Flask"],
  },
  {
    role: "Data Scientist",
    org: "Beyond Business Travel (Remote · Ireland)",
    date: "Aug — Dec 2022",
    location: "TUS, Ireland",
    region: "india",
    bullets: [
      "Automated multi‑format invoice extraction using OCR + NLP at 98% accuracy — saving 6 hours of manual work daily.",
      "Designed rule‑based validation and statistical outlier detection to flag pricing inconsistencies, reducing billing errors by 70%.",
    ],
    tags: ["OCR", "NLP", "Python"],
  },
];

const filters = [
  { id: "all", label: "All regions" },
  { id: "us", label: "United States" },
  { id: "india", label: "India" },
] as const;

export function Experience() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = roles.filter((r) => filter === "all" || r.region === filter);

  return (
    <section id="experience" className="px-6 md:px-10 py-28 md:py-40">
      <div className="max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.22em] text-muted mb-5">
              03 / Experience
            </h2>
            <p className="font-serif text-3xl md:text-5xl leading-tight">The journey, so far.</p>
          </div>
          <div role="tablist" className="inline-flex p-1 rounded-full bg-canvas-alt ring-1 ring-rule">
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] rounded-full transition-colors ${
                  filter === f.id
                    ? "bg-ink text-canvas"
                    : "text-muted hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ol className="divide-y divide-rule border-y border-rule">
          <AnimatePresence initial={false}>
            {visible.map((r) => (
              <motion.li
                key={`${r.role}-${r.org}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <details className="py-7 md:py-9 px-1 md:px-2">
                  <summary className="list-none cursor-pointer flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    <span className="font-mono text-xs text-muted md:w-44 shrink-0">
                      {r.date}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl md:text-3xl group-hover:text-accent transition-colors">
                        {r.role}{" "}
                        <span className="text-ink-soft font-sans text-base md:text-lg italic">
                          — {r.org}
                        </span>
                      </h3>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted md:w-40 md:text-right">
                      {r.location}
                    </span>
                    <span className="text-ink-soft transition-transform duration-500 group-open:rotate-45 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="mt-6 grid md:grid-cols-12 gap-6 md:gap-10">
                    <ul className="md:col-span-8 md:col-start-3 space-y-3 text-ink-soft leading-relaxed list-disc list-outside marker:text-accent pl-5">
                      {r.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <ul className="md:col-span-2 flex md:flex-col flex-wrap gap-2 text-[11px]">
                      {r.tags.map((t) => (
                        <li key={t} className="px-2.5 py-1 rounded-full bg-canvas-alt ring-1 ring-rule text-ink-soft">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  );
}
