// Generates mini project flowcharts as SVG.
// Style: fine ink strokes on warm paper — boxed pipeline stages joined by arrows.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dir, "../src/assets");
mkdirSync(OUT, { recursive: true });

const W = 1200, H = 900;
const BG = "#f4f2ec";
const INK = "#23201e";
const SANS = "'Helvetica Neue', Arial, sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const txt = (x, y, s, { size = 22, font = SANS, op = 0.95, weight = 400, ls = 0 }) =>
  `    <text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${INK}" fill-opacity="${op}" font-weight="${weight}" letter-spacing="${ls}" text-anchor="middle">${esc(s)}</text>`;

// Rounded box with stacked text: small uppercase tag, main label, optional sub.
function box(cx, cy, w, h, { tag, label, sub }) {
  const x = cx - w / 2, y = cy - h / 2;
  const parts = [
    `    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${BG}" stroke="${INK}" stroke-width="1.6" stroke-opacity="0.85"/>`,
  ];
  if (sub) {
    if (tag) parts.push(txt(cx, cy - 22, tag.toUpperCase(), { size: 14, font: MONO, op: 0.5, ls: 2 }));
    parts.push(txt(cx, cy + 8, label, { size: 23, weight: 500 }));
    parts.push(txt(cx, cy + 34, sub, { size: 15, font: MONO, op: 0.55, ls: 0.5 }));
  } else {
    if (tag) parts.push(txt(cx, cy - 10, tag.toUpperCase(), { size: 14, font: MONO, op: 0.5, ls: 2 }));
    parts.push(txt(cx, cy + (tag ? 18 : 8), label, { size: 23, weight: 500 }));
  }
  return parts.join("\n");
}

// Arrow from (x1,y1) to (x2,y2) with a small head.
function arrow(x1, y1, x2, y2) {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 11, sp = 0.45;
  return [
    `    <line x1="${x1}" y1="${y1}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="1.6" stroke-opacity="0.6" stroke-linecap="round"/>`,
    `    <line x1="${x2.toFixed(1)}" y1="${y2.toFixed(1)}" x2="${(x2 - s * Math.cos(a - sp)).toFixed(1)}" y2="${(y2 - s * Math.sin(a - sp)).toFixed(1)}" stroke="${INK}" stroke-width="1.6" stroke-opacity="0.75" stroke-linecap="round"/>`,
    `    <line x1="${x2.toFixed(1)}" y1="${y2.toFixed(1)}" x2="${(x2 - s * Math.cos(a + sp)).toFixed(1)}" y2="${(y2 - s * Math.sin(a + sp)).toFixed(1)}" stroke="${INK}" stroke-width="1.6" stroke-opacity="0.75" stroke-linecap="round"/>`,
  ].join("\n");
}

const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">\n` +
  `  <rect width="${W}" height="${H}" fill="${BG}"/>\n${body}\n</svg>\n`;

// Linear top-to-bottom flow of N nodes, centred.
function linear(nodes, { w = 560 } = {}) {
  const cx = 600, h = 120, gap = 40;
  const totalH = nodes.length * h + (nodes.length - 1) * gap;
  let cy = (H - totalH) / 2 + h / 2;
  const parts = [];
  const centers = [];
  for (const n of nodes) { centers.push(cy); cy += h + gap; }
  for (let i = 0; i < nodes.length - 1; i++)
    parts.push(arrow(cx, centers[i] + h / 2, cx, centers[i + 1] - h / 2 - 4));
  nodes.forEach((n, i) => parts.push(box(cx, centers[i], w, h, n)));
  return wrap(parts.join("\n"));
}

// One node -> two parallel branches -> merge into one node.
function branch(top, left, right, bottom) {
  const parts = [];
  const cyT = 165, cyM = 450, cyB = 740, hT = 110, hM = 122, hB = 110;
  const wT = 560, wM = 430, wB = 560;
  const cxL = 360, cxR = 840;
  parts.push(arrow(600, cyT + hT / 2, cxL, cyM - hM / 2 - 4));
  parts.push(arrow(600, cyT + hT / 2, cxR, cyM - hM / 2 - 4));
  parts.push(arrow(cxL, cyM + hM / 2, 600, cyB - hB / 2 - 4));
  parts.push(arrow(cxR, cyM + hM / 2, 600, cyB - hB / 2 - 4));
  parts.push(box(600, cyT, wT, hT, top));
  parts.push(box(cxL, cyM, wM, hM, left));
  parts.push(box(cxR, cyM, wM, hM, right));
  parts.push(box(600, cyB, wB, hB, bottom));
  return wrap(parts.join("\n"));
}

/* ── 1 · VAE Variants for Causal Effect Estimation ── */
const vae = linear([
  { tag: "Datasets", label: "IHDP · JOBS · TWINS", sub: "+ synthetic data" },
  { tag: "Models", label: "4 CEVAE Variants", sub: "β-VAE · HVAE · VQ-VAE · Corr-VAE" },
  { tag: "Training", label: "Grid-search pipeline", sub: "Adamax · early stopping" },
  { tag: "Evaluate", label: "Causal metrics", sub: "ATE · ATT · PEHE · policy risk" },
  { tag: "Result", label: "Best PEHE 1.47 ± 0.18", sub: "on JOBS" },
]);

/* ── 2 · Causal Analysis using Large Language Models ── */
const causalLlm = linear([
  { tag: "Input", label: "23 child-health variables", sub: "MICS-style survey" },
  { tag: "LLM labeling", label: "Claude / GPT-4o pairwise", sub: "CAUSES · CONFOUNDED · …" },
  { tag: "Graph", label: "Adjacency matrix → DAG", sub: "NetworkX" },
  { tag: "Benchmark", label: "vs DECI & LiNGAM", sub: "edge overlap · centrality" },
  { tag: "Query engine", label: "d-separation · backdoor sets", sub: "deterministic, not generated" },
]);

/* ── 3 · TB Forecasting with ARIMA & POMP ── */
const tb = branch(
  { tag: "Data", label: "TB incidence series", sub: "R" },
  { tag: "Model A", label: "ARIMA", sub: "ANOVA evaluation" },
  { tag: "Model B", label: "SEIRS POMP", sub: "stochastic · time-varying β" },
  { tag: "Output", label: "Forecast + report", sub: "reproducible" },
);

/* ── 4 · Shark Tank India: Deal & Quality Prediction ── */
const shark = branch(
  { tag: "Dataset", label: "121 Shark Tank pitches", sub: "feature engineering" },
  { tag: "Classifier", label: "ANN — offer or not", sub: "F1 87.09%" },
  { tag: "Fuzzy system", label: "22-rule Mamdani", sub: "deal quality" },
  { tag: "Output", label: "Offer + quality prediction", sub: "interpretable" },
);

const files = {
  "project-causal.svg": vae,
  "project-causal-llm.svg": causalLlm,
  "project-tb.svg": tb,
  "project-shark.svg": shark,
};
for (const [name, svg] of Object.entries(files)) {
  writeFileSync(resolve(OUT, name), svg);
  console.log("wrote", name);
}
