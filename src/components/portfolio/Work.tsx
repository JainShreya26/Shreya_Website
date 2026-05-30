import { Reveal } from "./Reveal";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import causalImg    from "@/assets/project-causal.jpg";
import soccerImg    from "@/assets/project-soccer.jpg";
import tbImg        from "@/assets/project-tb.jpg";
import sharkImg     from "@/assets/project-shark.jpg";
import statsImg     from "@/assets/project-stats.jpg";
import causalLlmImg from "@/assets/project-causal-llm.jpg";
import ragEvalImg   from "@/assets/project-rag-eval.jpg";

type Project = {
  index: string;
  category: string;
  year: string;
  title: string;
  blurb: string;
  tags: string[];
  image: string;
  alt: string;
  href?: string;
};

const projects: Project[] = [
  {
    index: "01",
    category: "Causal Deep Learning",
    year: "Nov – Dec 2024",
    title: "VAE Variants for Causal Effect Estimation",
    blurb:
      "Extended the CEVAE family — Beta‑VAE, HVAE, VQ‑VAE — to estimate treatment effects under unmeasured confounders. Best PEHE 1.47 ± 0.18 on JOBS using PyTorch, TensorFlow & Pyro.",
    tags: ["PyTorch", "TensorFlow", "CEVAE", "Pyro", "Causal Inference"],
    image: causalImg,
    alt: "Sparse causal graph illustration",
  },
  {
    index: "02",
    category: "Sports Analytics",
    year: "Apr 2024",
    title: "Soccer Analytics Dashboard",
    blurb:
      "Processed 3M+ records from 11 datasets via SQL & Python — ETL, cleaning, feature engineering — surfacing player and trend insights through an interactive Tableau dashboard.",
    tags: ["SQL", "Python", "Tableau", "Feature Engineering"],
    image: soccerImg,
    alt: "Pitch tactics line drawing with player trajectories",
  },
  {
    index: "03",
    category: "LLM Agents · Statistics",
    year: "2025",
    title: "Automated Statistical Discovery for Tabular Data",
    blurb:
      "A Streamlit assistant that uses LangChain tool‑calling to profile tabular datasets, suggest natural‑language hypotheses, run user‑approved cleaning, execute SciPy tests, and generate reproducible Python analysis code with visualizations.",
    tags: ["LangChain", "Streamlit", "SciPy", "LLM Agents"],
    image: statsImg,
    alt: "Hand‑drawn scatter plot, distribution and data table",
  },
  {
    index: "04",
    category: "Causal Inference · LLMs",
    year: "2025",
    title: "Causal Analysis using Large Language Models",
    blurb:
      "A web app that uses LLM‑assisted pairwise relationship labeling across user‑defined variables, builds directed graphs with NetworkX, and applies DoWhy‑style workflows for d‑separation checks, backdoor adjustment, and confounder identification.",
    tags: ["LangChain", "NetworkX", "DoWhy", "Causal Inference"],
    image: causalLlmImg,
    alt: "Sparse directed acyclic graph of nodes and edges",
  },
  {
    index: "05",
    category: "RAG · Evaluation",
    year: "2025",
    title: "Citation‑Aware RAG Quality Evaluator",
    blurb:
      "An evaluation workflow for scientific RAG outputs across 40+ literature queries — scoring claim‑level source attribution, retrieval recall, and per‑model cost/latency tradeoffs with reproducible JSON logs and a comparison leaderboard.",
    tags: ["RAG", "LLM Eval", "LangChain", "Python"],
    image: ragEvalImg,
    alt: "Stacked research papers with citation lines",
  },
  {
    index: "06",
    category: "Time Series · Public Health",
    year: "Nov – Dec 2023",
    title: "TB Forecasting with ARIMA & POMP",
    blurb:
      "Compared ARIMA against an SEIRS‑based stochastic POMP model with overdispersion and time‑varying transmission to fit declining TB incidence curves.",
    tags: ["R", "ARIMA", "POMP", "SEIRS"],
    image: tbImg,
    alt: "Hand‑drawn TB incidence forecast curve",
  },
  {
    index: "07",
    category: "Applied ML · Fuzzy Logic",
    year: "Oct – Dec 2022",
    title: "Shark Tank India — Deal & Quality Prediction",
    blurb:
      "Built a 121‑pitch dataset and benchmarked six classifiers; ANN reached 87.09% F1. Layered a 22‑rule Mamdani fuzzy system in MATLAB to score deal quality.",
    tags: ["Python", "R", "ANN", "Fuzzy Logic", "EDA"],
    image: sharkImg,
    alt: "Soft overlapping shapes representing fuzzy logic regions",
  },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  // Measure scroll relative to this card's natural (pre-sticky) layout position.
  // Progress keeps advancing even while the card is pinned, giving live parallax
  // during the sticky phase.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background image — moves at roughly half scroll speed (main depth layer)
  const imgRange = reduce ? 0 : isMobile ? 30 : 70;
  const imageY = useTransform(scrollYProgress, [0, 1], [imgRange, -imgRange]);

  // Text block — drifts even more gently (third, slowest layer)
  const copyRange = reduce ? 0 : isMobile ? 8 : 18;
  const copyY = useTransform(scrollYProgress, [0, 1], [copyRange, -copyRange]);

  return (
    // Sticky: each card pins at top with increasing z-index so the incoming card
    // always slides on top of the pinned one below it.
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        zIndex: i + 1,
        overflow: "hidden",
      }}
    >
      {/* Background image — slowest layer */}
      <motion.img
        style={{ y: imageY }}
        src={p.image}
        alt={p.alt}
        width={1800}
        height={1200}
        loading={i <= 1 ? "eager" : "lazy"}
        className="absolute -inset-y-20 inset-x-0 h-[calc(100%+10rem)] w-full object-cover will-change-transform"
      />

      {/* Gradient overlays for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink/96 via-ink/55 to-ink/18" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink/60 via-ink/15 to-transparent" />

      {/* Top metadata */}
      <div className="absolute top-6 left-7 right-7 z-[10] flex items-center justify-between md:top-9 md:left-11 md:right-11">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-canvas/75">
          {p.index} / {p.category}
        </span>
        <span className="font-mono text-[11px] text-canvas/55">{p.year}</span>
      </div>

      {/* Main content — middle layer */}
      <div className="absolute inset-0 z-[10] flex items-end px-7 pb-10 md:px-11 md:pb-16 lg:pb-20">
        <motion.div style={{ y: copyY }} className="max-w-3xl will-change-transform">
          <h3 className="font-serif text-4xl leading-[1.02] text-balance text-canvas md:text-6xl lg:text-7xl">
            {p.title}
          </h3>
          <p className="mt-5 max-w-[58ch] text-pretty text-[15px] leading-[1.65] text-canvas/82 md:text-lg">
            {p.blurb}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-canvas/20 bg-canvas/15 px-3 py-1 text-[12px] tracking-wide text-canvas/95"
              >
                {t}
              </li>
            ))}
          </ul>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-canvas px-4 py-2 text-xs font-medium tracking-wide text-ink transition-colors hover:bg-canvas/90"
            >
              View Project
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function Work() {
  const total = projects.length;

  return (
    <section id="work" className="relative">
      {/* Section header — normal flow, scrolls away before the stack */}
      <div className="border-y border-rule bg-canvas-alt/60 px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[44ch]">
              <h2 className="mb-5 text-[11px] uppercase tracking-[0.22em] text-muted">
                02 / Selected Work
              </h2>
              <p className="font-serif text-3xl leading-tight text-balance md:text-4xl">
                Translating complex datasets into models, dashboards, and decisions that actually
                ship.
              </p>
            </div>
            <p className="shrink-0 font-mono text-sm text-muted">07 case studies · 2022 — 2025</p>
          </Reveal>
        </div>
      </div>

      {/* Sticky stack — (total + 1) × 100svh gives the last card a full viewport
          of dwell time before the next section scrolls in. */}
      <div style={{ height: `${(total + 1) * 100}svh` }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
