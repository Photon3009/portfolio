// ---------------------------------------------------------------------------
// All numbers on this page come from the sweep artefacts of the experiment.
//
// PROVENANCE
//   [table] = value appears verbatim in a table of the write-up (exact)
//   [plot]  = value digitised off the generated matplotlib figure (±0.002)
//
// If you re-export the sweep JSONs, replace the [plot] rows with the exact
// values — the components read straight from here and nowhere else.
// ---------------------------------------------------------------------------

export type SweepPoint = { s: number; he: number; she: number };

/* ---------------------------------------------------------------------------
   Foreground set, on the warm sand ground.

   Measured against PAPER (#F2EEE5), only the red clears 4.5:1 as text:
     #C62828  4.86 ✓      #FF8F00  1.98 ✗      #FBC02D  1.43 ✗
   So amber and yellow are FILL colours — bars, chips, dots, with ink on top —
   and text/thin strokes use AMBER_INK, the same hue darkened until it passes.
   --------------------------------------------------------------------------- */
export const RED = "#C62828";
export const AMBER = "#FF8F00";
export const YELLOW = "#FBC02D";
export const BEIGE = "#F5F5DC";
export const CODE_HEAD = "#EAEAC9"; // one step deeper, for the code block's header bar
export const AMBER_INK = "#A85400"; // 4.61:1 — text-safe companion to AMBER

export const HE = RED; // works as both ink and fill
export const SHE = AMBER_INK; // labels, thin strokes, curve lines
export const SHE_FILL = AMBER; // bars, chips, dots — anything with area

export const INK = "#191919";
export const PAPER = "#F2EEE5"; // warm sand — has to read as a panel, not as off-white
export const PAPER_HEAD = "#E7E1D4"; // one step deeper, for the plate's header rule
export const RULE = "rgba(25,25,25,0.14)"; // hairline
export const RADIUS = 3; // one corner radius for every container in the piece

/* SAE health. Differentiated by intensity rather than hue, since the set has
   no cool anchor: muted stone → glaring yellow → the article's primary red. */
export const DEAD = "#736759"; // warm stone — inert
export const WARN = AMBER_INK; // text tone for saturated
export const WARN_FILL = YELLOW; // its fill
export const ALIVE = RED;

/** Llama-3.2-1B-Instruct · layer-8 SAE · steering f32258 (male-stereotype) */
export const LLAMA: Record<string, SweepPoint[]> = {
  male: [
    { s: -6, he: 0.053, she: 0.05 }, // [table]
    { s: -3, he: 0.108, she: 0.039 }, // [table]
    { s: -1, he: 0.158, she: 0.019 }, // [plot]
    { s: 0, he: 0.178, she: 0.012 }, // [table]
    { s: 1, he: 0.192, she: 0.008 }, // [plot]
    { s: 3, he: 0.21, she: 0.004 }, // [plot]
    { s: 6, he: 0.225, she: 0.004 }, // [table]
  ],
  female: [
    { s: -6, he: 0.015, she: 0.064 }, // [table]
    { s: -3, he: 0.015, she: 0.096 }, // [plot]
    { s: -1, he: 0.027, she: 0.102 }, // [plot]
    { s: 0, he: 0.039, she: 0.099 }, // [table]
    { s: 1, he: 0.056, she: 0.088 }, // [plot]
    { s: 3, he: 0.106, she: 0.056 }, // [plot]
    { s: 6, he: 0.163, she: 0.014 }, // [table]
  ],
  context: [
    { s: -6, he: 0.002, she: 0.034 }, // [plot]
    { s: -3, he: 0.001, she: 0.039 }, // [plot]
    { s: -1, he: 0.001, she: 0.039 }, // [plot]
    { s: 0, he: 0.003, she: 0.039 }, // [table]
    { s: 1, he: 0.006, she: 0.038 }, // [plot]
    { s: 3, he: 0.019, she: 0.03 }, // [plot]
    { s: 6, he: 0.034, she: 0.013 }, // [table]
  ],
};

/** LFM2.5-230M · layer-9 SAE · steering f9619 (female-context feature) */
export const LFM: Record<string, SweepPoint[]> = {
  female: [
    { s: -6, he: 0.063, she: 0.006 }, // [table]
    { s: -3, he: 0.043, she: 0.031 }, // [plot]
    { s: 0, he: 0.014, she: 0.102 }, // [table]
    { s: 3, he: 0.004, she: 0.143 }, // [plot]
    { s: 6, he: 0.003, she: 0.164 }, // [table]
  ],
  male: [
    { s: -6, he: 0.116, she: 0.005 }, // [table]
    { s: -3, he: 0.113, she: 0.003 }, // [plot]
    { s: 0, he: 0.103, she: 0.034 }, // [table]
    { s: 3, he: 0.044, she: 0.16 }, // [plot]
    { s: 6, he: 0.009, she: 0.234 }, // [table]
  ],
};

export type PanelSpec = {
  key: string;
  label: string;
  prompt: string;
  max: number;
};

export const LLAMA_PANELS: PanelSpec[] = [
  {
    key: "male",
    label: "Male-stereotyped",
    prompt: "“The mechanic said that …”",
    max: 0.24,
  },
  {
    key: "female",
    label: "Female-stereotyped",
    prompt: "“The nurse said that …”",
    max: 0.18,
  },
  {
    key: "context",
    label: "Context-override",
    prompt: "“The mechanic tied her hair back …”",
    max: 0.045,
  },
];

export const LFM_PANELS: PanelSpec[] = [
  {
    key: "female",
    label: "Female-stereotyped",
    prompt: "“The nurse said that …”",
    max: 0.18,
  },
  {
    key: "male",
    label: "Male-stereotyped",
    prompt: "“The mechanic said that …”",
    max: 0.24,
  },
];

/** The hairdresser probe — the completion, and what the SAE saw while writing it. */
export const COMPLETION = {
  prompt:
    "Continue this story in one sentence: The hairdresser picked up the scissors and then",
  text: "The hairdresser picked up the scissors and began to snip at the tangled mess, her hands moving deftly through the knots and snags as she worked to tame the unruly locks of the teenager's hair.",
  pronouns: ["her", "she"],
};

/** Strongest layer-8 SAE features on that completion, and the token each fires on. */
export const TOP_FEATURES = [
  { id: "f19231", token: "up", act: 1.95 },
  { id: "f29766", token: "def", act: 1.02 },
  { id: "f13848", token: "began", act: 0.93 },
  { id: "f27367", token: "ly", act: 0.68 },
  { id: "f8685", token: "knots", act: 0.67 },
  { id: "f29846", token: "at", act: 0.65 },
  { id: "f18001", token: "teenager", act: 0.52 },
  { id: "f19965", token: "mess", act: 0.5 },
];

/** Logit lens + layer ablation on the hairdresser probe. */
export type LayerRow = {
  layer: number;
  token: string;
  p: number;
  ablation: number;
};

export const LAYERS: LayerRow[] = [
  { layer: 0, token: "then", p: 1.0, ablation: 0.0 },
  { layer: 1, token: "then", p: 1.0, ablation: 0.0 },
  { layer: 2, token: "then", p: 0.96, ablation: 0.0 },
  { layer: 3, token: "then", p: 0.26, ablation: 0.001 },
  { layer: 4, token: "later", p: 0.02, ablation: 0.01 },
  { layer: 5, token: "later", p: 0.015, ablation: 0.002 },
  { layer: 6, token: "later", p: 0.01, ablation: 0.026 },
  { layer: 7, token: "afterwards", p: 0.035, ablation: 0.005 },
  { layer: 8, token: "again", p: 0.02, ablation: 0.017 },
  { layer: 9, token: "acle", p: 0.02, ablation: 0.064 },
  { layer: 10, token: "prompt", p: 0.1, ablation: 0.01 },
  { layer: 11, token: "abruptly", p: 0.11, ablation: 0.079 },
  { layer: 12, token: "promptly", p: 0.19, ablation: 0.02 },
  { layer: 13, token: "promptly", p: 0.13, ablation: 0.104 },
  { layer: 14, token: "began", p: 0.23, ablation: 0.169 },
  { layer: 15, token: "the", p: 0.4, ablation: 0.004 },
];

/** The three readings of one SAE (Figure 2). */
export const SAE_READINGS = [
  {
    key: "raw",
    label: "Raw activations",
    sub: "norm file skipped, no standardisation applied",
    l0: 3,
    verdict: "DEAD",
    tone: DEAD,
    note: "0.009% of features fire. The SAE is silent, and it never says so.",
  },
  {
    key: "invalid",
    label: "Invalid norm applied",
    sub: "the corrupted catalog file, as shipped",
    l0: 30688,
    verdict: "SATURATED",
    tone: WARN,
    note: "94% of features fire: a sparse autoencoder with no sparsity left.",
  },
  {
    key: "fixed",
    label: "Reconstructed norm",
    sub: "per-dim μ/σ recomputed from 22,503 wikitext tokens",
    l0: 6400,
    verdict: "ALIVE",
    tone: ALIVE,
    note: "Features become interpretable and, as it turns out, causal.",
  },
] as const;

/** Candidates and which of the two independent tests each survives. */
export type Candidate = {
  id: string;
  what: string;
  selectivity: boolean;
  push: boolean;
  fate: string;
};

export const CANDIDATES: Candidate[] = [
  {
    id: "f3432",
    what: "topic: repair & wiring vs clinics & phones",
    selectivity: false,
    push: false,
    fate: "Found by contrasting mismatched prompt sets. Its decoder direction projects to junk tokens.",
  },
  {
    id: "f26265",
    what: "grammatical possession: fires on “his” and “her” alike",
    selectivity: false,
    push: true,
    fate: "Pushes pronouns hard, but has no idea which occupation it is looking at.",
  },
  {
    id: "f9392",
    what: "food & nutrition (it loves the “dietitian” template)",
    selectivity: true,
    push: false,
    fate: "Top female-minus-male activation contrast. Zero pronoun push. An impostor.",
  },
  {
    id: "f27420",
    what: "female-stereotype candidate, selectivity only",
    selectivity: true,
    push: false,
    fate: "Kept deliberately as a negative control. Steering it moves nothing. See below.",
  },
  {
    id: "f32258",
    what: "male-occupation stereotype",
    selectivity: true,
    push: true,
    fate: "0.38 on male-stereotyped jobs vs 0.03 female / 0.16 neutral, and promotes “ he”.",
  },
];
