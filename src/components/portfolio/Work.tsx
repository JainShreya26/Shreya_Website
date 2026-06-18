import { Reveal } from "./Reveal";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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
  const [flipped, setFlipped] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY   = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 35,  reduce ? 0 : -35]);
  const cardY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 75,  reduce ? 0 : -75]);
  const textY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 55,  reduce ? 0 : -55]);

  return (
    <div
      ref={ref}
      style={{ position: "sticky", top: 0, height: "100svh", zIndex: i + 1, overflow: "hidden" }}
    >
      {/* Layer 1: blurred ambient background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        <img
          src={p.image} alt="" aria-hidden
          loading={i <= 1 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: "scale(1.18)", filter: "blur(80px) saturate(0.72)" }}
        />
        <div className="absolute inset-0 bg-ink/74" />
      </motion.div>

      {/* Desktop two-column layout */}
      <div className="hidden md:flex h-full items-center gap-14 px-14 lg:gap-16 lg:px-20 xl:gap-20 xl:px-28">

        {/* Left: flippable card (parallax layer 2) */}
        <motion.div style={{ y: cardY }} className="relative shrink-0 will-change-transform">
          {/* Perspective wrapper — required for 3-D depth */}
          <div style={{ perspective: "1200px", width: "min(43vw, 560px)", aspectRatio: "4 / 3" }}>
            <motion.div
              initial={false}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setFlipped((f) => !f)}
              style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative", cursor: "pointer" }}
            >

              {/* ── FRONT: project image ── */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.62)]"
                style={{ backfaceVisibility: "hidden", outline: "1px solid rgba(255,255,255,0.07)" }}
              >
                <img
                  src={p.image} alt={p.alt}
                  width={1800} height={1200}
                  loading={i <= 1 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
                {/* Subtle flip prompt */}
                <span className="pointer-events-none absolute bottom-3 right-4 select-none font-mono text-[9px] uppercase tracking-widest text-canvas/30">
                  ↻ skills
                </span>
              </div>

              {/* ── BACK: project details on canvas background ── */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.62)] bg-canvas flex flex-col p-7 lg:p-9"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", outline: "1px solid rgba(0,0,0,0.06)" }}
              >
                {/* Header row */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/42">
                    {p.index} / {p.category}
                  </p>
                  <p className="shrink-0 font-mono text-[10px] text-ink/30">{p.year}</p>
                </div>

                {/* Blurb — full detail here, brief on the right column */}
                <p className="flex-1 text-[13px] leading-[1.72] text-ink/68">
                  {p.blurb}
                </p>

                {/* Skill tags */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink/18 px-3 py-[3px] font-mono text-[10.5px] tracking-wide text-ink/65"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="border-b border-ink/22 pb-px font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 transition-colors hover:border-ink/50 hover:text-ink/80"
                    >
                      View Project ↗
                    </a>
                  ) : <span />}
                  <span className="select-none font-mono text-[9px] uppercase tracking-widest text-ink/22">
                    ↺ flip
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>

        {/* Right: title + metadata (parallax layer 3) */}
        <motion.div style={{ y: textY }} className="flex min-w-0 flex-col will-change-transform">
          <p className="mb-5 font-mono text-[11px] tracking-[0.24em] text-canvas/38">
            [{p.index}]
          </p>
          <h3 className="mb-3 font-serif text-[2.4rem] leading-[1.08] text-balance text-canvas xl:text-[2.8rem]">
            {p.title}
          </h3>
          <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.22em] text-canvas/38">
            {p.category} · {p.year}
          </p>
          {/* Short blurb — full version lives on the card back */}
          <p className="mb-8 max-w-[44ch] line-clamp-3 text-[13.5px] leading-[1.7] text-canvas/58">
            {p.blurb}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-canvas/25">
            ← click card for skills
          </p>
        </motion.div>

      </div>

      {/* Mobile: image background with text overlay */}
      <div className="md:hidden h-full">
        <img
          src={p.image} alt={p.alt}
          loading={i <= 1 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/97 via-ink/55 to-ink/15" />
        <div className="absolute left-6 right-6 top-7 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-canvas/65">
            {p.index} / {p.category}
          </span>
          <span className="font-mono text-[10px] text-canvas/45">{p.year}</span>
        </div>
        <div className="absolute bottom-10 left-6 right-6 z-10">
          <h3 className="mb-3 font-serif text-3xl leading-snug text-balance text-canvas">{p.title}</h3>
          <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-canvas/65">{p.blurb}</p>
          <ul className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="rounded-full border border-canvas/20 bg-canvas/12 px-2.5 py-[3px] text-[10px] tracking-wide text-canvas/88">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const total = projects.length;

  return (
    <section id="work" className="relative">
      {/* Section header — normal flow, scrolls away before the stack begins */}
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

      {/* Sticky stack — (total + 1) × 100svh lets the last card fully settle
          before the next section enters. Each card's z-index is i + 1 so the
          incoming card always slides on top of the pinned one below it. */}
      <div style={{ height: `${(total + 1) * 100}svh` }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
