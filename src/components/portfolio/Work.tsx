import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import projectCausalLlm from "../../assets/project-causal-llm-v2.webp";
import projectFoodLink from "../../assets/project-foodlink.webp";
import projectRoleSave from "../../assets/project-rolesave.webp";
import projectShark from "../../assets/project-shark-v2.webp";
import projectSoccer from "../../assets/project-soccer-v2.webp";
import projectVae from "../../assets/project-vae-v2.webp";
import { Reveal } from "./Reveal";

// Each case study carries its own signature hue from the palette.
const accents = [
  "var(--accent-2)",
  "var(--accent)",
  "var(--accent-3)",
  "var(--accent-5)",
  "var(--accent-4)",
  "var(--accent-3)",
];

type Project = {
  index: string;
  category: string;
  title: string;
  bullets: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  href?: string;
  linkLabel?: string;
};

const projects: Project[] = [
  {
    index: "01",
    category: "AI · Supply Chain",
    title: "FoodLink",
    bullets: [
      "Built a full-stack supply chain management platform using Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma, and SQLite, supporting inventory, shipments, delivery scheduling, and inter-food-bank transfers across 19 API routes.",
      "Integrated Anthropic Claude multimodal AI and structured JSON outputs to extract and normalize inventory data from emails, free-form text, CSV files, and delivery images.",
      "Developed a grounded AI inventory copilot using tool calling, Zod validation, tenant-scoped queries, and conversational voice input/output to answer stock, expiration, and nearby availability questions.",
      "Engineered a 14-day inventory forecasting system that combines on-hand stock, inbound/outbound shipments, par levels, and expiration data to identify projected shortages and at-risk inventory.",
      "Created a geospatial surplus-and-shortage marketplace with MapLibre GL, GeoJSON clustering, and Haversine distance filtering, enabling nearby food banks to coordinate redistribution.",
      "Implemented transactional transfer workflows with real-time inventory reconciliation, request negotiation, soft deletion, reversible transactions, and append-only audit trails.",
      "Designed driver coordination features with secure token-based check-ins, ETA tracking, consent-gated Twilio SMS integration, and automated shipment status updates.",
    ],
    tags: ["Next.js", "Claude", "Prisma", "MapLibre", "Twilio"],
    image: projectFoodLink,
    imageAlt: "Illustrated food-bank inventory and delivery network for FoodLink",
    href: "https://github.com/JainShreya26/FoodLink",
    linkLabel: "View repository",
  },
  {
    index: "02",
    category: "Automation · Security",
    title: "RoleSave",
    bullets: [
      "Built a full-stack job application tracker combining a Next.js dashboard, Chrome extension, and background worker in a pnpm monorepo.",
      "Automated application updates by parsing inbound emails and classifying confirmations, assessments, interviews, offers, and rejections using confidence-based, multi-signal matching.",
      "Engineered an idempotent job-capture pipeline that extracts posting metadata, archives web pages, and converts job descriptions to PDFs inside a hardened, network-isolated Docker container.",
      "Designed a secure multi-user PostgreSQL architecture with row-level security, private storage, atomic database functions, deduplication, retryable queues, and auditable event timelines.",
      "Created human-in-the-loop review and correction workflows for ambiguous email matches, preventing low-confidence automation from modifying the wrong application.",
      "Validated classification, matching, capture, and security behavior with 41 passing TypeScript tests, 14 realistic email fixtures, and database authorization test suites.",
    ],
    tags: ["Next.js", "PostgreSQL", "Chrome", "Docker", "TypeScript"],
    image: projectRoleSave,
    imageAlt: "Illustrated secure job-application capture and classification workflow for RoleSave",
    href: "https://github.com/JainShreya26/RoleSave",
    linkLabel: "View repository",
  },
  {
    index: "03",
    category: "Sports Analytics",
    title: "Soccer Analytics Dashboard",
    bullets: [
      "Integrated and cleaned 11 disparate soccer datasets totaling 3M+ records using Python and SQL, building an ETL workflow to resolve inconsistent keys, missing values, and duplicate entries across sources.",
      "Engineered performance metrics and season-level aggregations from raw match and player data, then designed an interactive Tableau dashboard with filters and drill-downs for exploring trends across teams, players, and seasons.",
      "Optimized performance with Tableau extracts and pre-aggregated views to keep the dashboard responsive on 3M+ rows, published on Tableau Public as a portfolio piece.",
    ],
    tags: ["SQL", "Python", "Tableau", "ETL", "Feature Engineering"],
    image: projectSoccer,
    imageAlt: "Illustrated soccer pitch with passing networks and analytical charts",
    href: "https://public.tableau.com/app/profile/shreya.jain6648/viz/Sci_Vizualization_Soccer_Analysis/Dashboard1",
    linkLabel: "View dashboard",
  },
  {
    index: "04",
    category: "Causal Inference · LLMs",
    title: "Causal Analysis using Large Language Models",
    bullets: [
      "Built an LLM-based causal discovery pipeline that infers causal structure among 23 under-five child health variables (immunization, malnutrition, schooling, WASH) from a MICS-style household survey.",
      "Designed a batched prompting system where Claude/GPT-4o classifies variable pairs as CAUSES, CAUSED_BY, CORRELATED, CONFOUNDED, or INDEPENDENT with structured JSON output, then converts directed judgments into an adjacency matrix and causal graph.",
      "Benchmarked the LLM-inferred graph against two statistical causal discovery baselines, DECI and LinGAM, using edge overlap analysis and five centrality metrics (in/out-degree, betweenness, closeness, eigenvector) to quantify where domain knowledge and data-driven methods agree.",
      "Implemented core causal inference algorithms from scratch: path enumeration, collider detection, d-separation (with collider-descendant handling), backdoor path identification, minimal adjustment set search, and identifiability checks.",
      "Built a natural-language query engine where Claude parses questions like “What should I control for when studying schooling’s effect on malnutrition?” into structured operations executed deterministically against the graph, so answers are derived from formal logic, not generated by the LLM.",
      "Validated with a test suite covering parents, confounders, adjustment sets, colliders, d-separation, and identifiability queries.",
    ],
    tags: ["Claude", "GPT-4o", "NetworkX", "d-separation", "Causal Inference"],
    image: projectCausalLlm,
    imageAlt: "Illustrated causal graph connected to a language model and deterministic query path",
  },
  {
    index: "05",
    category: "Causal Deep Learning",
    title: "VAE Variants for Causal Effect Estimation",
    bullets: [
      "Extended the CEVAE deep latent-variable model (NeurIPS 2017) to test whether advanced VAE architectures improve causal effect estimation under unmeasured confounders, implementing four variants in PyTorch: Correlated-VAE, Beta-VAE, Hierarchical VAE, and VQ-VAE.",
      "Built an end-to-end evaluation pipeline with grid search hyperparameter tuning, Adamax optimization, early stopping, and parallel experiment execution, benchmarking all models on 3 real-world datasets (IHDP, JOBS, TWINS) and synthetic data across 4 causal metrics (ATE, ATT, PEHE, policy risk).",
      "Achieved best PEHE of 1.47 ± 0.18 and ATE error of 1.26 ± 0.75 on the JOBS dataset, and showed that standard CEVAE matches more complex variants in accuracy, indicating its architecture has sufficient capacity for these causal inference tasks.",
    ],
    tags: ["PyTorch", "CEVAE", "Beta-VAE", "VQ-VAE", "Causal Inference"],
    image: projectVae,
    imageAlt: "Illustrated comparison of four variational autoencoder architectures and outputs",
  },
  {
    index: "06",
    category: "Applied ML · Fuzzy Logic",
    title: "Shark Tank India: Deal & Quality Prediction",
    bullets: [
      "Built an ANN model to predict whether Shark Tank India investors would make an offer to a startup, achieving an F1 score of 87.09% on an imbalanced dataset, outperforming SVM, Random Forest, KNN, and other classifiers.",
      "Designed a 22-rule Mamdani fuzzy logic system to classify deal quality (below average / average / good) based on startup revenue, valuation, and age, producing interpretable outputs founders can act on.",
      "Curated a custom dataset of 121 Shark Tank India pitches from public sources, engineering features like YoY revenue, equity ask, industry, and founder demographics through label encoding and imputation.",
      "Identified key pre-pitch predictors of investor offers - revenue, industry, ask amount, and equity percentage - isolating only features available before a deal is declared to avoid data leakage.",
      "Published and presented at ACM ICIMMI 2022.",
    ],
    tags: ["Python", "ANN", "Fuzzy Logic", "MATLAB", "EDA"],
    image: projectShark,
    imageAlt: "Illustrated startup-pitch prediction model and fuzzy deal-quality system",
    href: "https://dl.acm.org/doi/abs/10.1145/3590837.3590891",
    linkLabel: "Read paper",
  },
];

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const reduce = useReducedMotion();
  const c = accents[i % accents.length];

  return (
    <article
      style={{ zIndex: i + 1, "--c": c } as CSSProperties}
      className="group relative border-t border-rule bg-canvas xl:sticky xl:top-0 xl:flex xl:min-h-screen xl:items-center xl:overflow-hidden xl:rounded-t-[2.25rem] xl:border-t-0 xl:shadow-[0_-26px_60px_-34px_rgba(0,0,0,0.4)]"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 xl:rounded-t-[2.25rem]"
        style={{ background: "linear-gradient(90deg, var(--c), transparent 75%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: "color-mix(in oklab, var(--c) 22%, transparent)" }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-x-10 gap-y-8 px-6 py-14 md:grid-cols-12 md:px-10 md:py-16 xl:py-12">
        <div className="md:col-span-5 xl:col-span-4 xl:self-center">
          <Reveal y={28}>
            <div className="flex items-end justify-between gap-4">
              <span
                className="block font-serif text-[3.5rem] leading-none md:text-[4.5rem]"
                style={{ color: "color-mix(in oklab, var(--c) 70%, transparent)" }}
              >
                {p.index}
              </span>
              <p
                className="pb-1 text-right font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--c)" }}
              >
                {p.category}
              </p>
            </div>

            <figure
              className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.5rem] border bg-canvas-alt shadow-[0_22px_50px_-34px_rgba(0,0,0,0.55)]"
              style={{ borderColor: "color-mix(in oklab, var(--c) 28%, var(--rule))" }}
            >
              <img
                src={p.image}
                alt={p.imageAlt}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(145deg, color-mix(in oklab, var(--c) 9%, transparent), transparent 48%)",
                }}
              />
            </figure>

            <ul className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border px-3 py-1 font-mono text-[10.5px] tracking-wide text-ink-soft"
                  style={{
                    borderColor: "color-mix(in oklab, var(--c) 32%, transparent)",
                    background: "color-mix(in oklab, var(--c) 7%, transparent)",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="md:col-span-7 xl:col-span-8 xl:self-center">
          <Reveal y={28}>
            <h3 className="mb-7 font-serif text-[2rem] leading-[1.08] text-balance md:text-4xl xl:text-[2.65rem]">
              {p.title}
            </h3>
          </Reveal>

          <motion.ul
            className="space-y-4 border-l pl-7"
            style={{ borderColor: "color-mix(in oklab, var(--c) 35%, var(--rule))" }}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          >
            {p.bullets.map((b, bi) => (
              <motion.li
                key={bi}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="relative text-[14.5px] leading-[1.65] text-ink-soft"
              >
                <span
                  aria-hidden
                  className="absolute -left-[30px] top-[0.7em] h-[7px] w-[7px] rounded-full"
                  style={{ background: "var(--c)" }}
                />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          {p.href && (
            <Reveal y={16} delay={reduce ? 0 : 0.07 * p.bullets.length}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-b border-ink/25 pb-px font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
              >
                {p.linkLabel ?? "View project"}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="relative bg-canvas">
      <div className="border-y border-rule bg-canvas-alt/60 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-[11px] uppercase tracking-[0.22em] text-accent">03 / Projects</h2>
          </Reveal>
        </div>
      </div>

      <div className="relative">
        {projects.map((p, i) => (
          <ProjectRow key={p.title} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
