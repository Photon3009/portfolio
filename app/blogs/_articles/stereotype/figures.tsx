"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CANDIDATES,
  COMPLETION,
  HE,
  LAYERS,
  LFM,
  LFM_PANELS,
  LLAMA,
  LLAMA_PANELS,
  INK,
  PAPER,
  PAPER_HEAD,
  RULE,
  BEIGE,
  CODE_HEAD,
  SAE_READINGS,
  RED,
  SHE,
  SHE_FILL,
  WARN_FILL,
  TOP_FEATURES,
  type PanelSpec,
  type SweepPoint,
} from "./data";

/* ========================================================================== */
/*  primitives                                                                */
/* ========================================================================== */

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? Math.min(1, h.scrollTop / total) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${pct})`,
          background: `linear-gradient(90deg, ${HE}, ${SHE})`,
        }}
      />
    </div>
  );
}

/** Text column. Everything readable lives at this measure. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[40rem]">{children}</div>;
}

/**
 * Figure frame. Sized deliberately: `mid` breaks out of the text column just
 * enough to read as a different kind of object, `full` is for the scrolly.
 */
export function Frame({
  children,
  caption,
  label,
  n,
  size = "mid",
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
  label?: string;
  /** figure number, printed in the accent as a running index */
  n?: number;
  size?: "text" | "mid" | "full";
}) {
  const w =
    size === "text"
      ? "max-w-[36rem]"
      : size === "mid"
      ? "max-w-[41rem]"
      : "max-w-none";
  return (
    <Reveal className={`my-12 mx-auto ${w}`}>
      <figure
        className="border rounded-[3px] overflow-hidden"
        style={{ background: PAPER, borderColor: RULE }}
      >
        {/* ruled header — this is what makes it read as a plate, not a div */}
        {label && (
          <div
            className="flex items-baseline gap-2.5 px-3.5 py-1.5 border-b"
            style={{ borderColor: RULE, background: PAPER_HEAD }}
          >
            {n !== undefined && (
              <span
                className="font-mono text-[10px] font-bold tracking-[0.12em] tabular-nums"
                style={{ color: RED }}
              >
                {String(n).padStart(2, "0")}
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#191919]/45">
              {label}
            </span>
          </div>
        )}
        <div className="px-3.5 py-3.5">{children}</div>
        {caption && (
          <figcaption
            className="px-3.5 py-2.5 border-t text-[12.5px] text-[#191919]/60 leading-relaxed"
            style={{ borderColor: RULE }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/** Tab selector. Square, hairline, ink fill when live — not a pill. */
export function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10.5px] uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-[3px] border transition-colors ${
        on
          ? "text-white border-transparent"
          : "border-[#191919]/20 text-[#191919]/50 hover:border-[#191919]/45 hover:text-[#191919]/75"
      }`}
      style={on ? { background: INK } : undefined}
    >
      {children}
    </button>
  );
}

/** Square check control — a lab sheet, not an app switch. */
export function Switch({
  on,
  setOn,
  label,
  sub,
}: {
  on: boolean;
  setOn: (v: boolean) => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={() => setOn(!on)}
      className="text-left rounded-[3px] px-2.5 py-1.5 inline-flex items-center gap-2 border transition-colors"
      style={{
        borderColor: on ? HE : "rgba(25,25,25,0.18)",
        background: on ? `${HE}12` : "transparent",
      }}
    >
      <span
        className="h-3.5 w-3.5 shrink-0 rounded-[2px] border-[1.5px] flex items-center justify-center transition-colors"
        style={{
          borderColor: on ? HE : "rgba(25,25,25,0.35)",
          background: on ? HE : "transparent",
        }}
      >
        {on && (
          <svg viewBox="0 0 10 10" className="h-2 w-2">
            <path
              d="M1.5,5.2 L4,7.6 L8.5,2.4"
              fill="none"
              stroke="#fff"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span>
        <span className="block text-[12px] font-medium leading-tight">
          {label}
        </span>
        <span className="block text-[9.5px] font-mono text-[#191919]/45 leading-tight">
          {sub}
        </span>
      </span>
    </button>
  );
}

/** Action button. Square and mono, so it belongs to the same kit as Chip. */
export function Btn({
  onClick,
  children,
  primary = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10.5px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-[3px] border transition-colors ${
        primary
          ? "text-white border-transparent hover:opacity-85"
          : "border-[#191919]/25 text-[#191919]/65 hover:border-[#191919]/55 hover:text-[#191919]"
      }`}
      style={primary ? { background: INK } : undefined}
    >
      {children}
    </button>
  );
}

/** Pass / fail mark for the candidate table. */
function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-[1px] align-middle"
      style={{
        background: ok ? HE : "transparent",
        boxShadow: ok ? "none" : "inset 0 0 0 1.5px rgba(25,25,25,0.22)",
      }}
    />
  );
}

/**
 * Terminal snippet. One size everywhere in the piece, light on the page the
 * way LessWrong sets code (grey ground, 13px, tight leading) rather than the
 * heavy dark block the rest of the site uses.
 */
export function Cmd({ children }: { children: string }) {
  const code = children.trim();
  const lines = code.split("\n");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard API needs a secure context; fall back to a temp selection
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        return;
      } finally {
        document.body.removeChild(ta);
      }
    }
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div
      className="my-5 rounded-[3px] border overflow-hidden"
      style={{ background: BEIGE, borderColor: RULE }}
    >
      {/* header bar: the button lives here, so it can never sit over the code */}
      <div
        className="flex items-center justify-between gap-3 px-3 py-1 border-b"
        style={{ background: CODE_HEAD, borderColor: RULE }}
      >
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#191919]/40">
          terminal
        </span>
        <button
          onClick={copy}
          aria-label={copied ? "copied" : "copy to clipboard"}
          className="font-mono text-[9.5px] uppercase tracking-[0.14em] px-2 py-[3px] rounded-[3px] border transition-colors hover:border-[#191919]/50 hover:text-[#191919]"
          style={{
            borderColor: copied ? RED : "rgba(25,25,25,0.2)",
            color: copied ? RED : "rgba(25,25,25,0.5)",
          }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="px-4 py-3 font-mono text-[12.5px] leading-[1.6] overflow-x-auto">
        {lines.map((line, i) => {
          const comment = line.trimStart().startsWith("#");
          return (
            <div key={i} className="whitespace-pre">
              {comment ? (
                <span className="text-[#191919]/40">{line}</span>
              ) : (
                <>
                  <span className="text-[#191919]/25 select-none">$ </span>
                  <span className="text-[#191919]/80">{line}</span>
                </>
              )}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

/**
 * Jargon with a safety net. Dotted underline, and on hover or keyboard focus a
 * one-sentence plain-English gloss plus a link out, so a beginner never has to
 * leave the page to keep reading.
 */
export function Term({
  children,
  def,
  href,
  source,
}: {
  children: React.ReactNode;
  def: string;
  href: string;
  source: string;
}) {
  return (
    <span className="relative inline-block group">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-help focus:outline-none"
        style={{
          borderBottom: `1px dotted ${RED}`,
          textDecoration: "none",
        }}
      >
        {children}
      </a>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-40 mt-1.5 w-[min(19rem,72vw)] -translate-x-1/2
                   rounded-[3px] border p-2.5 text-left opacity-0 shadow-sm transition-opacity duration-150
                   group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: PAPER, borderColor: "rgba(25,25,25,0.22)" }}
      >
        <span className="block text-[13px] leading-snug text-[#191919]/85">
          {def}
        </span>
        <span
          className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.12em]"
          style={{ color: RED }}
        >
          {source} ↗
        </span>
      </span>
    </span>
  );
}

/** Conversational margin note — the “I can sleep at night” voice. */
export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-6 pl-5 border-l-2 border-[#191919]/15 text-[15px] italic text-[#191919]/60 leading-relaxed">
      {children}
    </p>
  );
}

/** A single number, big enough to stop on. */
export function BigNumber({
  value,
  label,
  color = "#191919",
}: {
  value: string;
  label: string;
  color?: string;
}) {
  return (
    <Reveal className="my-10 text-center">
      <div
        className="font-mono text-5xl sm:text-6xl font-semibold tracking-tight"
        style={{ color }}
      >
        {value}
      </div>
      <div className="mt-2 text-[13px] text-[#191919]/55 mx-auto max-w-sm leading-relaxed">
        {label}
      </div>
    </Reveal>
  );
}

/* ========================================================================== */
/*  the tally — the visual language for every ratio in the piece               */
/* ========================================================================== */

function counts(he: number, she: number, total = 16) {
  const share = he / (he + she);
  let h = Math.round(share * total);
  if (he > 0 && h === 0) h = 1;
  if (she > 0 && h === total) h = total - 1;
  return { h, s: total - h };
}

export function Tally({
  he,
  she,
  total = 16,
  animate = false,
}: {
  he: number;
  she: number;
  total?: number;
  animate?: boolean;
}) {
  const { h, s } = counts(he, she, total);
  const chips = [
    ...Array.from({ length: h }, () => "he"),
    ...Array.from({ length: s }, () => "she"),
  ];
  return (
    <div className="flex flex-wrap gap-1">
      {chips.map((c, i) => (
        <span
          key={i}
          className="font-mono text-[11px] leading-none px-1.5 py-1 rounded-[3px] transition-all duration-500"
          style={{
            background: c === "he" ? HE : SHE_FILL,
            color: c === "he" ? "#fff" : INK,
            transitionDelay: animate ? `${i * 45}ms` : "0ms",
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/** The opening image: sixteen pronouns, fifteen of them the same one. */
export function HookTally() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 350);
    return () => clearTimeout(t);
  }, []);
  return (
    <div ref={ref} className="my-10 mx-auto max-w-[40rem]">
      <div className="text-[13px] text-[#191919]/55 font-mono mb-3">
        “The mechanic said that …”
      </div>
      <div
        className={`transition-opacity duration-700 ${
          on ? "opacity-100" : "opacity-0"
        }`}
      >
        <Tally he={0.178} she={0.012} animate />
      </div>
      <div className="mt-3 text-[14px] text-[#191919]/70 leading-relaxed">
        Sixteen pronouns. Fifteen of them are the same one. Nothing in that
        sentence says anything about a person’s gender. The model brought that
        with it.
      </div>
    </div>
  );
}

/* ========================================================================== */
/*  the crime scene: one completion, and what the SAE saw                     */
/* ========================================================================== */

export function CompletionAnatomy() {
  const [n, setN] = useState(0);
  const [running, setRunning] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const words = useMemo(() => COMPLETION.text.split(" "), []);
  const done = n >= words.length;

  useEffect(() => {
    if (!running || done) return;
    const t = setTimeout(() => setN((v) => v + 1), 42);
    return () => clearTimeout(t);
  }, [running, n, done]);

  const run = () => {
    setN(0);
    setShowFeatures(false);
    setRunning(true);
  };

  return (
    <Frame
      label="the hairdresser probe"
      n={1}
      caption={
        <>
          One sample, no cherry-picking beyond “this is the one I traced”. The
          prompt is gender-neutral all the way through.
        </>
      }
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-[#191919]/40 font-mono mb-1">
        prompt
      </div>
      <p className="font-mono text-[13px] text-[#191919]/70 leading-relaxed">
        {COMPLETION.prompt}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Btn onClick={run} primary>
          {n === 0 ? "run the model" : "run it again"}
        </Btn>
        <span className="text-[11px] font-mono text-[#191919]/40">
          {n === 0 ? "nothing generated yet" : done ? "done" : "generating…"}
        </span>
      </div>

      <p className="mt-3.5 text-[15px] leading-[1.7] min-h-[4.5rem]">
        {words.slice(0, n).map((w, i) => {
          const bare = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
          const hit = COMPLETION.pronouns.includes(bare);
          return (
            <span key={i}>
              {hit ? (
                <span
                  className="px-1.5 py-0.5 rounded-[3px] font-medium"
                  style={{ background: SHE_FILL, color: INK }}
                >
                  {w}
                </span>
              ) : (
                <span className={done ? "" : "text-[#191919]/90"}>{w}</span>
              )}{" "}
            </span>
          );
        })}
        {!done && running && (
          <span className="inline-block w-[2px] h-[1.1em] align-middle bg-[#191919] animate-pulse" />
        )}
      </p>

      {done && (
        <div className="animate-[fadeIn_0.6s_ease-out]">
          <p className="text-[14px] text-[#191919]/70 leading-relaxed border-t border-[#191919]/10 pt-4">
            It picked a gender in the ninth word and never wavered. So the
            obvious question is: what was the model thinking at the moment it
            decided? Here is everything the layer-8 SAE lit up on, ranked.
          </p>
          <div className="mt-3">
            <Btn onClick={() => setShowFeatures((v) => !v)}>
              {showFeatures ? "hide the features" : "show me the features"}
            </Btn>
          </div>

          {showFeatures && (
            <div className="mt-4 space-y-1.5">
              {TOP_FEATURES.map((f) => (
                <div key={f.id} className="flex items-center gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] text-[#191919]/60">
                    {f.id}
                  </span>
                  <span className="flex-1 h-3 bg-[#191919]/6 rounded-[3px] overflow-hidden">
                    <span
                      className="block h-full bg-[#191919]/35"
                      style={{ width: `${(f.act / 2) * 100}%` }}
                    />
                  </span>
                  <span className="w-24 shrink-0 font-mono text-[11px] text-[#191919]/45">
                    on ‘{f.token}’
                  </span>
                </div>
              ))}
              <p className="pt-3 text-[15px] leading-relaxed">
                Read that list again.{" "}
                <strong>Not one of them is about gender.</strong> The strongest
                feature in the model at the moment it committed to “her” is
                firing on the word “up”. This is why the rest of this post exists. You cannot find the stereotype by looking at what
                shouts loudest.
              </p>
            </div>
          )}
        </div>
      )}
    </Frame>
  );
}

/* ========================================================================== */
/*  the baseline                                                              */
/* ========================================================================== */

const BASELINE = [
  {
    key: "male",
    label: "mechanic, engineer, pilot…",
    tab: "male-stereotyped",
    he: 0.178,
    she: 0.012,
    verdict: "he 15 : 1",
    lean: HE,
    line: "The model is very sure a mechanic is a “he”.",
  },
  {
    key: "female",
    label: "nurse, librarian, florist…",
    tab: "female-stereotyped",
    he: 0.039,
    she: 0.099,
    verdict: "she 2.5 : 1",
    lean: SHE,
    line: "It is much less sure a nurse is a “she”. The bias is lopsided, not symmetric.",
  },
  {
    key: "context",
    label: "“The mechanic tied her hair back…”",
    tab: "her, in the prompt",
    he: 0.003,
    she: 0.039,
    verdict: "she 13 : 1",
    lean: SHE,
    line: "Give it an actual pronoun and it listens. Remember this row. It does not survive the knob.",
  },
];

export function BaselineBias() {
  const [active, setActive] = useState("male");
  const row = BASELINE.find((r) => r.key === active)!;
  return (
    <Frame
      label="the model as shipped"
      n={2}
      caption="Mean next-token probability over 12 prompts per group, at the strength-0 point of the steering sweeps."
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {BASELINE.map((r) => (
          <Chip key={r.key} on={active === r.key} onClick={() => setActive(r.key)}>
            {r.tab}
          </Chip>
        ))}
      </div>

      <div className="text-[12px] text-[#191919]/50 font-mono mb-3">
        {row.label}
      </div>

      <Tally he={row.he} she={row.she} />

      <div className="mt-4 flex items-baseline gap-3 flex-wrap">
        <span
          className="font-mono text-2xl tabular-nums"
          style={{ color: row.lean }}
        >
          {row.verdict}
        </span>
        <span className="font-mono text-[11px] text-[#191919]/45 tabular-nums">
          P(he) {row.he.toFixed(3)} · P(she) {row.she.toFixed(3)}
        </span>
      </div>
      <p className="mt-2 text-[14px] text-[#191919]/70">{row.line}</p>
    </Frame>
  );
}

/* ========================================================================== */
/*  layer scrubber                                                            */
/* ========================================================================== */

export function LayerScrubber() {
  const [layer, setLayer] = useState(0);
  const row = LAYERS[layer];
  const maxAbl = Math.max(...LAYERS.map((l) => l.ablation));

  const commentary =
    row.layer <= 3
      ? "Still echoing the prompt. Whatever the model believes about the hairdresser is not readable here yet."
      : row.layer <= 8
      ? "The echo has faded and nothing has replaced it. This quiet middle is where the priors consolidate, and where we read the residual stream."
      : row.layer <= 14
      ? "The real work. Knock this layer out and the output moves. The stereotype is being cashed into a token right about now."
      : "Decided. ‘The’ at p = 0.40, and nine words later it will say “her”.";

  return (
    <Frame
      label="drag through the network"
      n={3}
      caption={
        <>
          Bars are logit-lens confidence in the top token; rings are how much the
          output moves when that layer alone is ablated. The prediction is not
          made where you read it. It is made just after.
        </>
      }
    >
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-mono text-[11px] text-[#191919]/45">
          layer {row.layer}
          {row.layer === 8 && " · SAE reads here"}
        </span>
        <span className="font-mono text-2xl">‘{row.token}’</span>
        <span className="font-mono text-[11px] text-[#191919]/45 tabular-nums">
          p {row.p.toFixed(2)} · ablation Δ {row.ablation.toFixed(3)}
        </span>
      </div>

      <svg viewBox="0 0 640 118" className="w-full h-auto mt-3" role="img">
        {LAYERS.map((l, i) => {
          const x = 20 + i * 40;
          const h = l.p * 58;
          const r = 3 + (l.ablation / maxAbl) * 10;
          const on = i === layer;
          return (
            <g key={l.layer}>
              <rect
                x={x - 8}
                y={92 - h}
                width={16}
                height={Math.max(h, 1)}
                fill={HE}
                opacity={on ? 1 : 0.2}
                className="transition-all duration-300"
              />
              <circle
                cx={x}
                cy={104}
                r={r}
                fill="none"
                stroke={SHE}
                strokeWidth={on ? 2.2 : 1.3}
                opacity={on ? 1 : 0.32}
                className="transition-all duration-300"
              />
              <text
                x={x}
                y={116}
                textAnchor="middle"
                fontSize="8"
                fill="#191919"
                fillOpacity={on ? 0.8 : 0.28}
                fontFamily="monospace"
              >
                {l.layer}
              </text>
            </g>
          );
        })}
        <line x1="0" y1="92" x2="640" y2="92" stroke="#191919" strokeOpacity="0.12" />
        <line
          x1={20 + 8 * 40}
          y1="4"
          x2={20 + 8 * 40}
          y2="92"
          stroke={SHE}
          strokeDasharray="3 3"
          strokeOpacity="0.5"
        />
        <text x={20 + 8 * 40 + 5} y="12" fontSize="8" fill={SHE} fontFamily="monospace">
          SAE
        </text>
      </svg>

      <input
        type="range"
        min={0}
        max={LAYERS.length - 1}
        step={1}
        value={layer}
        onChange={(e) => setLayer(Number(e.target.value))}
        aria-label="layer"
        className="w-full mt-1 accent-[#191919] cursor-pointer"
      />
      <p className="mt-2 text-[14px] text-[#191919]/70 leading-relaxed min-h-[3rem]">
        {commentary}
      </p>
    </Frame>
  );
}

/* ========================================================================== */
/*  the silent instrument                                                     */
/* ========================================================================== */

const TOTAL_FEATURES = 32768;
const LOG = (n: number) => (Math.log10(n) / Math.log10(TOTAL_FEATURES)) * 100;

export function SaeHealth() {
  const [i, setI] = useState(0);
  const r = SAE_READINGS[i];
  const pctLit = (r.l0 / TOTAL_FEATURES) * 100;
  const litCells = Math.round((pctLit / 100) * 150);

  return (
    <Frame
      label="one SAE, three readings"
      n={4}
      caption="Same layer-8 SAE, same twelve prompts. The only thing that changes is the normalisation file, and neither broken state raises an error."
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {SAE_READINGS.map((r, idx) => (
          <button
            key={r.key}
            onClick={() => setI(idx)}
            className={`font-mono text-[10.5px] uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-[3px] border transition-colors ${
              i === idx
                ? "text-white border-transparent"
                : "border-[#191919]/20 text-[#191919]/50 hover:border-[#191919]/45 hover:text-[#191919]/75"
            }`}
            style={i === idx ? { background: r.tone } : undefined}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-mono text-2xl tabular-nums" style={{ color: r.tone }}>
          L0 = {r.l0.toLocaleString()}
        </span>
        <span
          className="font-mono text-[11px] tracking-[0.2em]"
          style={{ color: r.tone }}
        >
          {r.verdict}
        </span>
        <span className="text-[12px] text-[#191919]/50">{r.sub}</span>
      </div>

      {/*
        A scale, not a slider. All three readings sit on the one log axis so you
        can see how far apart they are; the markers are buttons, so the thing
        that looks clickable is clickable.
      */}
      <div className="mt-5">
        <div className="relative h-9">
          <div
            className="absolute top-2.5 bottom-3 bg-[#C62828]/10 rounded-[2px]"
            style={{ left: `${LOG(100)}%`, width: `${LOG(1000) - LOG(100)}%` }}
          />
          <div
            className="absolute top-[22px] left-0 right-0 h-px"
            style={{ background: RULE }}
          />
          {SAE_READINGS.map((s, idx) => {
            const live = i === idx;
            return (
              <button
                key={s.key}
                onClick={() => setI(idx)}
                title={`${s.label}: L0 ${s.l0.toLocaleString()}`}
                className="absolute top-0 h-9 w-9 -translate-x-1/2 flex items-center justify-center cursor-pointer group"
                style={{ left: `${LOG(s.l0)}%` }}
              >
                <span
                  className="rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: live ? 15 : 10,
                    height: live ? 15 : 10,
                    background: live ? s.tone : "transparent",
                    boxShadow: live
                      ? `0 0 0 3.5px ${PAPER}`
                      : "inset 0 0 0 2px rgba(25,25,25,0.28)",
                  }}
                />
              </button>
            );
          })}
          <div
            className="absolute top-0 text-[9px] font-mono text-[#C62828] whitespace-nowrap"
            style={{ left: `${LOG(100)}%` }}
          >
            healthy: hundreds
          </div>
        </div>
        <div className="relative h-4 text-[10px] font-mono text-[#191919]/35">
          {[1, 10, 100, 1000, 10000, 32768].map((t) => (
            <span
              key={t}
              className="absolute -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${Math.min(97, Math.max(3, LOG(t)))}%` }}
            >
              {t.toLocaleString()}
            </span>
          ))}
        </div>
      </div>

      {/* 150-cell sampler */}
      <div className="mt-5">
        <div className="grid grid-cols-[repeat(50,minmax(0,1fr))] gap-[2px] max-w-[26rem]">
          {Array.from({ length: 150 }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-[1px] transition-colors duration-500"
              style={{
                background: idx < litCells
                  ? r.key === "invalid"
                    ? WARN_FILL // yellow reads as "everything is on" far better than its ink
                    : r.tone
                  : "rgba(25,25,25,0.07)",
                transitionDelay: `${(idx % 50) * 6}ms`,
              }}
            />
          ))}
        </div>
        <div className="text-[10px] font-mono text-[#191919]/40 mt-1.5">
          150-cell sample of the dictionary ·{" "}
          {pctLit.toFixed(pctLit < 1 ? 3 : 0)}% firing
        </div>
      </div>

      <p className="mt-4 text-[14px] text-[#191919]/70 leading-relaxed">
        {r.note}
      </p>
    </Frame>
  );
}

/* ========================================================================== */
/*  two tests                                                                 */
/* ========================================================================== */

export function TwoTests() {
  const [sel, setSel] = useState(false);
  const [push, setPush] = useState(false);
  const survives = (c: (typeof CANDIDATES)[number]) =>
    (!sel || c.selectivity) && (!push || c.push);
  const alive = CANDIDATES.filter(survives).length;

  return (
    <Frame
      label="switch on both filters"
      n={5}
      caption="Selectivity waves through anything that correlates with the occupation groups. Output push waves through every grammar feature that touches a pronoun. Only the overlap is interesting."
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <Switch
          on={sel}
          setOn={setSel}
          label="fires selectively"
          sub="one group, not the other"
        />
        <Switch
          on={push}
          setOn={setPush}
          label="pushes the pronoun"
          sub="decoder → vocabulary"
        />
      </div>

      {/* column rule */}
      <div
        className="flex items-center gap-3 pb-1.5 mb-1 border-b font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#191919]/35"
        style={{ borderColor: RULE }}
      >
        <span className="w-[4.2rem] shrink-0">feature</span>
        <span className="flex-1">what it actually is</span>
        <span className="w-8 text-center shrink-0">sel</span>
        <span className="w-8 text-center shrink-0">push</span>
      </div>

      <div>
        {CANDIDATES.map((c) => {
          const ok = survives(c);
          return (
            <div
              key={c.id}
              className="relative py-2.5 border-b transition-all duration-500"
              style={{
                borderColor: RULE,
                opacity: ok ? 1 : 0.32,
              }}
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="w-[4.2rem] shrink-0 font-mono text-[13px] font-bold"
                  style={{ color: ok ? INK : "rgba(25,25,25,0.6)" }}
                >
                  {c.id}
                </span>
                <span className="flex-1 text-[13.5px] text-[#191919]/80">
                  {c.what}
                </span>
                <span className="w-8 shrink-0 text-center">
                  <Mark ok={c.selectivity} />
                </span>
                <span className="w-8 shrink-0 text-center">
                  <Mark ok={c.push} />
                </span>
              </div>
              <div className="flex gap-3 mt-0.5">
                <span className="w-[4.2rem] shrink-0" />
                <span className="flex-1 text-[12px] text-[#191919]/50 leading-snug pr-16">
                  {c.fate}
                </span>
              </div>
              {/* struck out the moment a filter rejects it */}
              <span
                className="absolute left-0 right-0 top-1/2 h-px transition-transform duration-500 origin-left"
                style={{
                  background: RED,
                  transform: `scaleX(${ok ? 0 : 1})`,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 flex items-baseline gap-2.5">
        <span
          className="font-mono text-2xl font-bold tabular-nums transition-colors duration-500"
          style={{ color: alive === 1 ? HE : INK }}
        >
          {alive}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#191919]/45">
          of {CANDIDATES.length} still standing
          {alive === 1 && " · and it is the one that steers"}
        </span>
      </div>
    </Frame>
  );
}


/* ========================================================================== */
/*  the knob                                                                  */
/* ========================================================================== */

function ratioLabel(he: number, she: number) {
  if (he >= she) {
    const r = she > 0 ? he / she : Infinity;
    return {
      text: r < 1.35 ? "≈ even" : `he ${r.toFixed(r < 10 ? 1 : 0)}:1`,
      color: r < 1.35 ? "#191919" : HE,
    };
  }
  const r = he > 0 ? she / he : Infinity;
  return {
    text: r < 1.35 ? "≈ even" : `she ${r.toFixed(r < 10 ? 1 : 0)}:1`,
    color: r < 1.35 ? "#191919" : SHE,
  };
}

function MiniCurve({
  points,
  max,
  strength,
}: {
  points: SweepPoint[];
  max: number;
  strength: number;
}) {
  const W = 200;
  const H = 66;
  const x = (s: number) => 8 + ((s + 6) / 12) * (W - 16);
  const y = (v: number) => H - 6 - (v / max) * (H - 16);
  const path = (k: "he" | "she") =>
    points.map((p, i) => `${i ? "L" : "M"}${x(p.s)},${y(p[k])}`).join(" ");
  const cur = points.find((p) => p.s === strength);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <line x1={x(0)} y1="3" x2={x(0)} y2={H - 6} stroke="#191919" strokeOpacity="0.13" strokeDasharray="3 3" />
      <line x1="8" y1={H - 6} x2={W - 8} y2={H - 6} stroke="#191919" strokeOpacity="0.12" />
      <path d={path("he")} fill="none" stroke={HE} strokeWidth="2" />
      <path d={path("she")} fill="none" stroke={SHE} strokeWidth="2" />
      <line
        x1={x(strength)}
        y1="3"
        x2={x(strength)}
        y2={H - 6}
        stroke="#191919"
        strokeOpacity="0.35"
        className="transition-all duration-500 ease-out"
      />
      {cur && (
        <>
          <circle cx={x(strength)} cy={y(cur.he)} r="3" fill={HE} className="transition-all duration-500 ease-out" />
          <circle cx={x(strength)} cy={y(cur.she)} r="3" fill={SHE} className="transition-all duration-500 ease-out" />
        </>
      )}
    </svg>
  );
}

function SteerPanel({
  spec,
  points,
  strength,
  dim,
  compact = false,
}: {
  spec: PanelSpec;
  points: SweepPoint[];
  strength: number;
  dim: boolean;
  compact?: boolean;
}) {
  const p = points.find((q) => q.s === strength) ?? points[0];
  const r = ratioLabel(p.he, p.she);
  const only = compact ? "hidden sm:block" : "block";

  return (
    <div
      className={`rounded-[3px] border p-2.5 transition-all duration-500 ${
        dim ? "opacity-35 border-[#191919]/8" : "opacity-100 border-[#191919]/20 bg-white"
      }`}
    >
      <div className="text-[11px] font-medium leading-tight">{spec.label}</div>
      <div className={`${only} text-[10px] text-[#191919]/45 font-mono mt-0.5 truncate`}>
        {spec.prompt}
      </div>

      <div className="mt-2 space-y-1">
        {(["he", "she"] as const).map((k) => (
          <div key={k} className="flex items-center gap-1.5">
            <span
              className="w-5 sm:w-7 shrink-0 font-mono text-[10px]"
              style={{ color: k === "he" ? HE : SHE }}
            >
              {k}
            </span>
            <span className="flex-1 h-2.5 bg-[#191919]/6 rounded-[3px] overflow-hidden">
              <span
                className="block h-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(100, (p[k] / spec.max) * 100)}%`,
                  background: k === "he" ? HE : SHE_FILL,
                }}
              />
            </span>
            <span
              className={`${compact ? "hidden sm:inline" : "inline"} w-10 shrink-0 text-right font-mono text-[10px] tabular-nums text-[#191919]/55`}
            >
              {p[k].toFixed(3)}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-2 font-mono text-[13px] tabular-nums transition-colors duration-500"
        style={{ color: r.color }}
      >
        {r.text}
      </div>
      <div className={only}>
        <MiniCurve points={points} max={spec.max} strength={strength} />
      </div>
    </div>
  );
}

type Step = { s: number; focus: string | null; body: React.ReactNode };

const LLAMA_STEPS: Step[] = [
  {
    s: 0,
    focus: "male",
    body: (
      <>
        <strong>Strength zero.</strong> No intervention. This is the model you
        would download. Fifteen “he” for every “she”. This is the number we are
        trying to move.
      </>
    ),
  },
  {
    s: -6,
    focus: "male",
    body: (
      <>
        <strong>Subtract it.</strong> Six units of one decoder direction,
        removed from the layer-8 residual stream at every position. The gap
        closes to <strong>1.1 : 1</strong>. Nothing else about the model was
        touched, and the sentences still make sense: the mechanic story goes
        from “informed them” to “inform them”, not to word salad.
      </>
    ),
  },
  {
    s: 6,
    focus: "female",
    body: (
      <>
        <strong>Now push the other way.</strong> Nurses, librarians, florists (occupations the model was leaning “she” on) flip to{" "}
        <strong>he, 12 : 1</strong>. Same knob, opposite direction, smooth the
        whole way. That smoothness is the point: a feature that is merely
        correlated with a behaviour does not do this.
      </>
    ),
  },
  {
    s: 6,
    focus: "context",
    body: (
      <>
        <strong>And now the part that unsettled me.</strong> The prompt is “The
        mechanic tied <em>her</em> hair back before …”. The pronoun is right
        there in the text. At baseline the model respects it, 13:1. Turn the
        knob to +6 and it contradicts a word it has already read:{" "}
        <strong>he wins 2.5 : 1</strong>.
      </>
    ),
  },
];

export function SteeringScrolly() {
  const [strength, setStrength] = useState(0);
  const [focus, setFocus] = useState<string | null>("male");
  const [step, setStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[i] = el;
    },
    []
  );

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = els.indexOf(e.target as HTMLDivElement);
          if (i < 0) return;
          setStep(i);
          setStrength(LLAMA_STEPS[i].s);
          setFocus(LLAMA_STEPS[i].focus);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const strengths = useMemo(() => LLAMA.male.map((p) => p.s), []);
  const idx = strengths.indexOf(strength);

  return (
    <div className="my-12">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10">
        <div className="lg:sticky lg:top-8 lg:self-start sticky top-0 z-20 bg-white/95 backdrop-blur-sm py-2 lg:py-0">
          <div className="border border-[#191919]/12 rounded-[3px] bg-[#F2EEE5] p-3">
            <div className="flex items-baseline justify-between mb-2.5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#191919]/40 font-mono">
                f32258 · llama-3.2-1b · layer 8
              </span>
              <span className="font-mono text-[12px] tabular-nums">
                strength{" "}
                <span className="text-[15px] font-semibold">
                  {strength > 0 ? `+${strength}` : strength}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {LLAMA_PANELS.map((spec) => (
                <SteerPanel
                  key={spec.key}
                  spec={spec}
                  points={LLAMA[spec.key]}
                  strength={strength}
                  dim={focus !== null && focus !== spec.key}
                  compact
                />
              ))}
            </div>

            <input
              type="range"
              min={0}
              max={strengths.length - 1}
              step={1}
              value={idx < 0 ? 3 : idx}
              onChange={(e) => {
                setStrength(strengths[Number(e.target.value)]);
                setFocus(null);
              }}
              aria-label="steering strength"
              className="w-full mt-3 accent-[#191919] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#191919]/35">
              <span>−6 subtract</span>
              <span>0 untouched</span>
              <span>+6 amplify</span>
            </div>
          </div>
        </div>

        <div>
          {LLAMA_STEPS.map((st, i) => (
            <div
              key={i}
              ref={setStepRef(i)}
              className="min-h-[58vh] lg:min-h-[68vh] flex items-center"
            >
              <p
                className={`text-[17px] leading-relaxed transition-opacity duration-500 ${
                  step === i ? "opacity-100" : "opacity-40"
                }`}
              >
                {st.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto max-w-[40rem] text-[13px] text-[#191919]/50 leading-relaxed">
        The slider is yours. Drag it and the scroll narration lets go. Points
        are the measured sweep values, twelve prompts per group, mean next-token
        probability at the final position.
      </p>
    </div>
  );
}

/* ========================================================================== */
/*  negative control + the mirror                                             */
/* ========================================================================== */

/**
 * The control only means something next to the thing it is controlling for, so
 * both features are drawn on one shared axis at one shared scale.
 */
export function NegativeControl() {
  const W = 320;
  const H = 58;
  const MAX = 0.24;
  const px = (s: number) => 8 + ((s + 6) / 12) * (W - 16);
  const py = (v: number) => H - 7 - (v / MAX) * (H - 16);

  const rows = [
    {
      id: "f32258",
      tests: "SEL ✓  PUSH ✓",
      verdict: "a knob",
      tone: HE,
      pts: LLAMA.male.map((p) => ({ s: p.s, v: p.he })),
      measured: true,
      from: 0.053,
      to: 0.225,
      delta: "+0.172",
    },
    {
      id: "f27420",
      tests: "SEL ✓  PUSH ✗",
      verdict: "nothing",
      tone: "rgba(25,25,25,0.4)",
      pts: [
        { s: -6, v: 0.184 },
        { s: 6, v: 0.174 },
      ],
      measured: false,
      from: 0.184,
      to: 0.174,
      delta: "−0.010",
    },
  ];

  return (
    <Frame
      label="the control that had to do nothing"
      n={6}
      caption={
        <>
          Both features swept over the same twelve units of steering, drawn at
          the same scale. f27420 passed selectivity and failed output push, and
          I kept it precisely so the experiment contained something that{" "}
          <em>ought</em> not to work. Its two endpoints are measured; the line
          between them is drawn, not sampled.
        </>
      }
    >
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className={`grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-3 ${
              i ? "border-t pt-2.5" : ""
            }`}
            style={i ? { borderColor: RULE } : undefined}
          >
            <div>
              <div
                className="font-mono text-[13px] font-bold"
                style={{ color: r.tone }}
              >
                {r.id}
              </div>
              <div className="font-mono text-[9px] tracking-[0.08em] text-[#191919]/40 mt-0.5">
                {r.tests}
              </div>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
              <line
                x1="8"
                y1={py(0)}
                x2={W - 8}
                y2={py(0)}
                stroke="#191919"
                strokeOpacity="0.1"
              />
              <line
                x1={px(0)}
                y1="4"
                x2={px(0)}
                y2={py(0)}
                stroke="#191919"
                strokeOpacity="0.12"
                strokeDasharray="3 3"
              />
              <path
                d={r.pts
                  .map((p, j) => `${j ? "L" : "M"}${px(p.s)},${py(p.v)}`)
                  .join(" ")}
                fill="none"
                stroke={r.tone}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={r.measured ? undefined : "5 4"}
              />
              {r.pts.map((p) => (
                <circle
                  key={p.s}
                  cx={px(p.s)}
                  cy={py(p.v)}
                  r="3.2"
                  fill={r.measured ? r.tone : PAPER}
                  stroke={r.tone}
                  strokeWidth="2"
                />
              ))}
            </svg>

            <div className="text-right">
              <div
                className="font-mono text-[17px] font-bold tabular-nums leading-none"
                style={{ color: r.tone }}
              >
                {r.delta}
              </div>
              <div className="font-mono text-[9px] text-[#191919]/40 mt-1 tabular-nums">
                {r.from.toFixed(3)} → {r.to.toFixed(3)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-3 pt-2.5 border-t font-mono text-[11px] uppercase tracking-[0.12em] text-[#191919]/45"
        style={{ borderColor: RULE }}
      >
        same sweep · same axis ·{" "}
        <span style={{ color: HE }}>17× the movement</span> from the feature
        that passed both tests
      </div>
    </Frame>
  );
}

export function MirrorLab() {
  const [model, setModel] = useState<"llama" | "lfm">("llama");
  const [strength, setStrength] = useState(6);

  const sweep = model === "llama" ? LLAMA : LFM;
  const panels = model === "llama" ? LLAMA_PANELS : LFM_PANELS;
  const strengths = useMemo(
    () => (model === "llama" ? LLAMA.male : LFM.male).map((p) => p.s),
    [model]
  );
  const snapped = strengths.reduce((a, b) =>
    Math.abs(b - strength) < Math.abs(a - strength) ? b : a
  );
  const idx = strengths.indexOf(snapped);

  return (
    <Frame
      label="hold the strength, swap the model"
      n={7}
      caption={
        <>
          In Llama the knob is a <span style={{ color: HE }}>male-context</span>{" "}
          feature that drives P(“ he”). In LFM2.5 the knob is a{" "}
          <span style={{ color: SHE }}>female-context</span> feature that drives
          P(“ she”), on <em>both</em> prompt groups. Same behaviour learned,
          opposite wiring.
        </>
      }
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(
          [
            ["llama", "Llama-3.2-1B · f32258"],
            ["lfm", "LFM2.5-230M · f9619"],
          ] as const
        ).map(([k, label]) => (
          <Chip key={k} on={model === k} onClick={() => setModel(k)}>
            {label}
          </Chip>
        ))}
      </div>

      <div
        className={`grid gap-2 ${
          panels.length === 2 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {panels.map((spec) => (
          <SteerPanel
            key={spec.key}
            spec={spec}
            points={sweep[spec.key]}
            strength={snapped}
            dim={false}
          />
        ))}
      </div>

      <input
        type="range"
        min={0}
        max={strengths.length - 1}
        step={1}
        value={idx < 0 ? 0 : idx}
        onChange={(e) => setStrength(strengths[Number(e.target.value)])}
        aria-label="steering strength"
        className="w-full mt-3 accent-[#191919] cursor-pointer"
      />
      <div className="flex justify-between text-[10px] font-mono text-[#191919]/35">
        <span>−6</span>
        <span>
          strength {snapped > 0 ? `+${snapped}` : snapped}
          {model === "lfm" && " · baseline here is only 3:1"}
        </span>
        <span>+6</span>
      </div>
    </Frame>
  );
}
