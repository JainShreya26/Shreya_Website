import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";

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
    role: "AI Research Engineer",
    org: "Michigan Medicine",
    date: "Mar 2025 - Present",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Deployed a Streamlit AI co-scientist platform spanning ASO, CRISPR, Bioinformatics, Global Health, Biomni, and Causal Reasoning, with GPT/Claude generation and persistent FAISS retrieval.",
      "Integrated Semantic Scholar, Unpaywall, and curated PDF retrieval, improving Claude’s overall accuracy by 21% and ES-VE classification accuracy by 46% on a balanced 100-variant benchmark.",
      "Added parallel grounding across 7 biological databases, including ClinVar, Ensembl, UniProt, and ClinicalTrials.gov, raising batch-mode ES-VE accuracy from 0.60 to 0.81 and positive-class precision from 0.15 to 0.33.",
      "Reduced grounding context by 98.9%, from approximately 242K to 2.7K tokens, using query-aware condensation, lightweight model routing, and safeguards that eliminated context-window overflows.",
      "Benchmarked 300 gene variants with 2,400 predictions across 4 models and two exon-skipping strategies (ES-RF and ES-VE) using a parallel, resumable, rate-limit-aware evaluation harness.",
      "Evaluated model performance using precision, recall, specificity, NPV, F1 score, confusion matrices, abstention-aware scoring, ensemble agreement, and provenance audits to detect execution-mode and model-version confounds.",
      "Developed a deterministic causal-inference engine supporting d-separation, collider detection, backdoor-path analysis, and adjustment-set discovery, with LLM-generated graphs benchmarked against DECI and LiNGAM.",
    ],
    tags: ["RAG", "LangChain", "DECI", "LiNGAM", "NetworkX", "Streamlit"],
  },
  {
    role: "Research Assistant",
    org: "University of Michigan",
    date: "May - Dec 2024",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Built a Python/NLP extraction pipeline combining rule-based parsing, schema-driven processing, and custom spaCy NER (7 domain labels) for historic texts.",
      "Fine-tuned GPT-based NER and Llama-3-8B with PyTorch, Hugging Face, LoRA, and quantization, reaching 98% extraction accuracy, 75% domain entity recognition, and 66% F1 on specialized entities.",
      "Wrote comprehensive unit tests and automated validation for outlier detection, extracted outputs, and consistency checks, reducing validation time by two hours per dataset.",
    ],
    tags: ["Python", "spaCy", "PyTorch", "LoRA", "Llama"],
  },
  {
    role: "Graduate Student Instructor",
    org: "SI 649 · University of Michigan",
    date: "Aug - Dec 2024",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Taught data visualization with Tableau, Plotly, Altair, D3.js, and GenAI tools.",
      "Led interactive design labs with real-world datasets; appointment came with full tuition waiver.",
    ],
    tags: ["Tableau", "D3.js", "Altair", "Plotly"],
  },
  {
    role: "Research Assistant",
    org: "University of Michigan",
    date: "Jun - Aug 2024",
    location: "Ann Arbor, MI",
    region: "us",
    bullets: [
      "Increased patient response rates from 10% to 68% and eliminated 3 hours of daily reporting by engineering SQL ETL pipelines and real-time Power BI KPI dashboards for participation and completion analytics.",
      "Enabled predictive engagement modeling across 65 participants by developing reinforcement-learning-based games and behavioral telemetry pipelines for feature engineering, segmentation, and adherence analysis.",
      "Modeled early identification of at-risk participants by training and evaluating 3 classification models: Logistic Regression, Random Forest, and XGBoost on behavioral data using feature engineering, cross-validation, and ROC-AUC.",
    ],
    tags: ["SQL", "Power BI", "RL", "XGBoost"],
  },
  {
    role: "Data Science Intern",
    org: "Ministry of Defence · DRDO",
    date: "Oct 2022 - Jul 2023",
    location: "Pune, India",
    region: "india",
    bullets: [
      "Led UI development for a product, from Figma prototyping through the development and deployment of a Flask application.",
      "Reduced pose-keypoint jitter by 35% while validating 5 Army drill postures using MediaPipe, OpenCV, and Python.",
      "Enabled real-time feedback by classifying 15+ keypoints using joint-angle calculations, visibility, and live error feedback.",
      "Achieved 98% detection accuracy and reduced background noise by engineering a YOLOv8/PyTorch auto-cropping pipeline, deployed as an offline Flask application for government use.",
    ],
    tags: ["Figma", "MediaPipe", "YOLOv8", "Flask"],
  },
  {
    role: "Data Scientist",
    org: "Beyond Business Travel (Remote · Ireland)",
    date: "Aug - Dec 2022",
    location: "TUS, Ireland",
    region: "india",
    bullets: [
      "Saved 8+ staff-hours daily by replacing manual invoice entry with a React and Django document-automation website.",
      "Achieved 98% extraction accuracy using Python, pypdf, OCR, layout-aware parsing, and automated validation.",
    ],
    tags: ["React", "Django", "OCR", "pypdf"],
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
    <section id="experience" className="relative overflow-hidden px-6 md:px-10 py-28 md:py-40">
      <Parallax
        speed={0.5}
        className="pointer-events-none absolute -top-10 left-0 select-none md:-left-4"
      >
        <span className="font-serif text-[34vw] leading-none text-accent/[0.05] md:text-[18vw]">
          02
        </span>
      </Parallax>
      <div className="relative max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="text-[11px] uppercase tracking-[0.22em] text-accent mb-5">
              02 / Experience
            </h2>
            <p className="font-serif text-3xl md:text-5xl leading-tight">The journey, so far.</p>
          </div>
          <div
            role="tablist"
            className="inline-flex p-1 rounded-full bg-canvas-alt ring-1 ring-rule"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                style={
                  filter === f.id
                    ? {
                        background: "linear-gradient(120deg, var(--accent), var(--accent-2))",
                        color: "var(--accent-foreground)",
                      }
                    : undefined
                }
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] rounded-full transition-colors ${
                  filter === f.id ? "" : "text-muted hover:text-ink"
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
                    <span className="font-mono text-xs text-muted md:w-44 shrink-0">{r.date}</span>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl md:text-3xl group-hover:text-accent transition-colors">
                        {r.role}{" "}
                        <span className="text-ink-soft font-sans text-base md:text-lg italic">
                          - {r.org}
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
                        <li
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-canvas-alt ring-1 ring-rule text-ink-soft"
                        >
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
