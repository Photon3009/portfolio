"use client";

import React from "react";
import { Reveal } from "./figures";
import { HE, INK as PALETTE_INK, SHE, SHE_FILL } from "./data";

/**
 * Spot illustrations, Pudding-style: hand-drawn line art with a real photo
 * head dropped onto a cartoon body.
 *
 * The "hand-drawn" quality is a turbulence + displacement filter applied to
 * clean geometry — cheaper than actually drawing wobbly paths, and it keeps
 * the shapes editable. The photo sits OUTSIDE the filtered group so it stays
 * undistorted.
 */

const HEAD = "/article/aquin/head.png";
const INK = PALETTE_INK;

function Rough({ id, seed = 5 }: { id: string; seed?: number }) {
  return (
    <filter id={id} x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.018"
        numOctaves="3"
        seed={seed}
        result="n"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="n"
        scale="2.2"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  );
}

function Plate({
  children,
  caption,
  width = "34rem",
}: {
  children: React.ReactNode;
  caption: string;
  width?: string;
}) {
  return (
    <Reveal className="my-12">
      <figure className="mx-auto" style={{ maxWidth: width }}>
        {children}
        <figcaption className="mt-2 text-center text-[13px] text-[#191919]/50 leading-relaxed">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** Photo head + drawn shoulders. */
function Head({
  x,
  y,
  size = 66,
  shoulders = true,
}: {
  x: number;
  y: number;
  size?: number;
  shoulders?: boolean;
}) {
  const h = (size * 200) / 190;
  return (
    <g>
      {shoulders && (
        <path
          d={`M${x + size * 0.1},${y + h * 0.92} C${x + size * 0.2},${
            y + h * 0.74
          } ${x + size * 0.8},${y + h * 0.74} ${x + size * 0.9},${y + h * 0.92}`}
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
      <image href={HEAD} x={x} y={y} width={size} height={h} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/*  0 · the stack, with one drawer pulled out                                  */
/* -------------------------------------------------------------------------- */

export function LayerStack() {
  const slabs = Array.from({ length: 16 }, (_, i) => i); // 0 = bottom
  const slabH = 13;
  const gap = 3;
  const baseY = 268;
  const y = (i: number) => baseY - (i + 1) * (slabH + gap);

  return (
    <Plate
      width="36rem"
      caption="Sixteen layers of working memory. We pull one drawer open and read what is inside."
    >
      <svg viewBox="0 0 640 300" className="w-full h-auto" role="img">
        <Rough id="rgh-stack" seed={41} />
        <g
          filter="url(#rgh-stack)"
          fill="none"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {slabs.map((i) =>
            i === 8 ? null : (
              <path
                key={i}
                d={`M108,${y(i)} L322,${y(i) - 1} L323,${y(i) + slabH} L109,${
                  y(i) + slabH + 1
                } Z`}
                strokeOpacity="0.35"
              />
            )
          )}
          {/* layer 8, slid out of the stack */}
          <path
            d={`M108,${y(8)} L438,${y(8) - 2} L440,${y(8) + slabH + 2} L109,${
              y(8) + slabH + 1
            } Z`}
            stroke={HE}
            strokeWidth="3.5"
          />
          {/* the arm reaching into the open drawer */}
          <path
            d="M556,238 C512,238 478,214 452,180"
            strokeWidth="13"
            strokeOpacity="0.9"
          />
          <path d="M444,170 C432,164 420,170 420,182 C420,194 434,198 444,190" />
          <path d="M432,164 L428,153 M442,166 L442,154 M450,174 L456,164" />
        </g>

        <g fontFamily="var(--font-mono)" fontSize="13" fill={INK}>
          <text x="94" y={y(15) + 11} textAnchor="end" fillOpacity="0.35">
            15
          </text>
          <text x="94" y={y(0) + 11} textAnchor="end" fillOpacity="0.35">
            0
          </text>
          <text x="94" y={y(8) + 11} textAnchor="end" fill={HE} fontWeight="700">
            8
          </text>
          <text x="336" y={y(8) + 11} fill={HE} fontSize="14" fontWeight="700">
            2048 numbers
          </text>
        </g>

        <Head x={528} y={126} size={62} />
      </svg>
    </Plate>
  );
}

/* -------------------------------------------------------------------------- */
/*  1 · the wrong turn                                                         */
/* -------------------------------------------------------------------------- */

export function WrongTurn() {
  return (
    <Plate
      width="36rem"
      caption="Three attempts, all of them accelerating toward the wrong sign."
    >
      <svg viewBox="0 0 640 310" className="w-full h-auto" role="img">
        <Rough id="rgh-turn" seed={11} />
        <g
          filter="url(#rgh-turn)"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* left sign — the wrong way */}
          <path d="M120,146 L118,292" />
          <path d="M44,58 L200,52 L203,146 L47,150 Z" />
          <path d="M62,36 L188,33" />
          <path d="M62,36 L78,26 M62,36 L79,46" />

          {/* right sign — the right way */}
          <path d="M520,146 L522,292" />
          <path d="M440,52 L596,58 L593,150 L437,146 Z" />
          <path d="M452,33 L578,36" />
          <path d="M578,36 L562,26 M578,36 L561,46" />

          {/* car, heading left */}
          <path d="M242,256 C242,230 249,224 266,222 L302,219 L322,196 L382,196 L397,220 L428,224 C441,226 444,234 444,256 Z" />
          <circle cx="286" cy="260" r="19" />
          <circle cx="286" cy="260" r="6" />
          <circle cx="404" cy="260" r="19" />
          <circle cx="404" cy="260" r="6" />
          {/* speed lines trailing behind */}
          <path d="M466,214 L516,212 M472,232 L532,230 M466,250 L510,248" />
        </g>

        <g
          filter="url(#rgh-turn)"
          fill={INK}
          fontFamily="var(--font-mono)"
          fontWeight="700"
          textAnchor="middle"
        >
          <text x="123" y="94" fontSize="26">
            TOPIC
          </text>
          <text x="123" y="126" fontSize="26">
            FEATURES
          </text>
          <text x="516" y="94" fontSize="26">
            THE REAL
          </text>
          <text x="516" y="126" fontSize="26">
            THING
          </text>
        </g>

        <Head x={318} y={140} size={64} />
      </svg>
    </Plate>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · the instrument that says nothing                                       */
/* -------------------------------------------------------------------------- */

export function SilentBox() {
  return (
    <Plate
      width="34rem"
      caption="It does not crash, and it does not warn you. It simply stops saying anything."
    >
      <svg viewBox="0 0 640 250" className="w-full h-auto" role="img">
        <Rough id="rgh-box" seed={3} />
        <g
          filter="url(#rgh-box)"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* the autoencoder, as a box */}
          <path d="M42,86 L232,78 L238,206 L48,212 Z" />
          {/* little status lamp, dark */}
          <circle cx="70" cy="106" r="7" />

          {/* speech bubble */}
          <path d="M300,44 L604,50 L598,166 L392,162 L352,196 L358,160 L296,158 Z" />

          {/* flatline inside it, with one dying blip */}
          <path d="M330,108 L432,106 L444,84 L456,132 L468,106 L570,108" />
        </g>

        <g filter="url(#rgh-box)" fill={INK} fontFamily="var(--font-mono)">
          <text x="140" y="142" fontSize="30" fontWeight="700" textAnchor="middle">
            SAE
          </text>
          <text
            x="140"
            y="172"
            fontSize="15"
            textAnchor="middle"
            fillOpacity="0.55"
          >
            32,768 features
          </text>
        </g>

        <text
          x="452"
          y="232"
          fontSize="15"
          textAnchor="middle"
          fill={INK}
          fillOpacity="0.5"
          fontFamily="var(--font-mono)"
        >
          L0 = 3
        </text>
      </svg>
    </Plate>
  );
}

/* -------------------------------------------------------------------------- */
/*  2b · two sieves                                                            */
/* -------------------------------------------------------------------------- */

/** Little junk shapes that get caught by each sieve. */
function Junk({
  x,
  y,
  kind,
  r = 7,
}: {
  x: number;
  y: number;
  kind: number;
  r?: number;
}) {
  if (kind % 3 === 0) return <circle cx={x} cy={y} r={r} />;
  if (kind % 3 === 1)
    return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} rx="1.5" />;
  return <path d={`M${x},${y - r} L${x + r},${y + r} L${x - r},${y + r} Z`} />;
}

export function TwoSieves() {
  const falling = [
    [186, 36], [238, 22], [290, 42], [342, 24], [394, 38], [214, 64], [366, 62],
  ];
  // sieves span 130 → 430, leaving the right column free for their labels
  const L = 130;
  const R = 430;
  return (
    <Plate
      width="33rem"
      caption="Each sieve alone lets the wrong things through. Stacked, they pass exactly one."
    >
      <svg viewBox="0 0 640 372" className="w-full h-auto" role="img">
        <Rough id="rgh-sieve" seed={53} />
        <g
          filter="url(#rgh-sieve)"
          fill="none"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {falling.map(([x, y], i) => (
            <Junk key={i} x={x} y={y} kind={i} />
          ))}

          {/* sieve 1 */}
          <path d={`M${L},112 L${R},108`} strokeWidth="3.5" />
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${L + 14 + i * 27},112 L${L + 14 + i * 27},122`} />
          ))}
          {/* what it rejects, tipping off to the left */}
          <Junk x={92} y={146} kind={1} />
          <Junk x={62} y={176} kind={2} />

          {/* sieve 2 */}
          <path d={`M${L},214 L${R},210`} strokeWidth="3.5" />
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${L + 14 + i * 27},214 L${L + 14 + i * 27},224`} />
          ))}
          {/* what it rejects, tipping off to the right */}
          <Junk x={468} y={248} kind={0} />
          <Junk x={498} y={278} kind={1} />

          {/* the jar that catches the survivor */}
          <path d="M236,272 L324,272 L320,330 L240,330 Z" />
          <path d="M232,272 L328,272" strokeWidth="3.5" />
        </g>

        <circle cx="280" cy="306" r="9" fill={HE} />

        <g fontFamily="var(--font-mono)" fontSize="13" fill={INK}>
          <text x={R + 18} y="118" fillOpacity="0.6">
            fires selectively
          </text>
          <text x={R + 18} y="220" fillOpacity="0.6">
            pushes the pronoun
          </text>
          <text x="72" y="204" fontSize="12" fillOpacity="0.45" textAnchor="middle">
            topic
          </text>
          <text x="486" y="306" fontSize="12" fillOpacity="0.45">
            grammar
          </text>
          <text
            x="280"
            y="356"
            textAnchor="middle"
            fill={HE}
            fontSize="14"
            fontWeight="700"
          >
            f32258
          </text>
        </g>
      </svg>
    </Plate>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · the knob                                                               */
/* -------------------------------------------------------------------------- */

export function KnobPlate() {
  const cx = 236;
  const cy = 168;
  const r = 96;
  const tick = (k: number) => {
    const a = ((k * 40 - 90) * Math.PI) / 180;
    return {
      x1: cx + Math.cos(a) * (r + 10),
      y1: cy + Math.sin(a) * (r + 10),
      x2: cx + Math.cos(a) * (r + 26),
      y2: cy + Math.sin(a) * (r + 26),
      lx: cx + Math.cos(a) * (r + 44),
      ly: cy + Math.sin(a) * (r + 44),
    };
  };
  const pointer = (() => {
    const a = ((80 - 90) * Math.PI) / 180;
    return { x: cx + Math.cos(a) * (r - 22), y: cy + Math.sin(a) * (r - 22) };
  })();

  return (
    <Plate
      width="36rem"
      caption="One direction, twelve units of travel, and a model that changes its mind about who fixes cars."
    >
      <svg viewBox="0 0 640 330" className="w-full h-auto" role="img">
        <Rough id="rgh-knob" seed={19} />
        <g
          filter="url(#rgh-knob)"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={cx} cy={cy} r={r} />
          <circle cx={cx} cy={cy} r={r - 16} strokeOpacity="0.35" />
          <path d={`M${cx},${cy} L${pointer.x},${pointer.y}`} strokeWidth="5" />
          <circle cx={cx} cy={cy} r="7" fill={INK} />
          {[-3, -2, -1, 0, 1, 2, 3].map((k) => {
            const t = tick(k);
            return (
              <path
                key={k}
                d={`M${t.x1},${t.y1} L${t.x2},${t.y2}`}
                strokeWidth={k === 0 ? 4 : 2.5}
              />
            );
          })}

          {/* an arm reaching in from the right to grip the rim */}
          <path
            d="M516,236 C470,236 430,220 402,196"
            strokeWidth="14"
            strokeOpacity="0.9"
          />
          <path d="M392,182 C378,180 368,188 370,200 C372,212 386,214 396,206" />
          <path d="M382,178 L376,168 M392,180 L390,168 M400,186 L404,174" />
        </g>

        <g fontFamily="var(--font-mono)" fontSize="17" fontWeight="700">
          <text
            x={tick(-3).lx}
            y={tick(-3).ly}
            fill={SHE}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            −6
          </text>
          <text
            x={tick(0).lx}
            y={tick(0).ly}
            fill={INK}
            textAnchor="middle"
            dominantBaseline="middle"
            fillOpacity="0.5"
          >
            0
          </text>
          <text
            x={tick(3).lx}
            y={tick(3).ly}
            fill={HE}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            +6
          </text>
          <text x={cx} y={cy + 58} fill={INK} fontSize="14" textAnchor="middle" fillOpacity="0.45" fontWeight="400">
            f32258
          </text>
        </g>

        <Head x={498} y={128} size={64} />
      </svg>
    </Plate>
  );
}

/* -------------------------------------------------------------------------- */
/*  3b · the stereotype outvotes the text                                      */
/* -------------------------------------------------------------------------- */

export function ContextFight() {
  return (
    <Plate
      width="34rem"
      caption="It read the word. At +6 it says the other one anyway."
    >
      <svg viewBox="0 0 640 250" className="w-full h-auto" role="img">
        <Rough id="rgh-fight" seed={67} />
        <g
          filter="url(#rgh-fight)"
          fill="none"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* the prompt, on paper */}
          <path d="M40,36 L246,28 L254,196 L48,204 Z" />
          <path d="M66,72 L214,68 M66,100 L226,96 M66,156 L192,152 M66,178 L150,176" />
          {/* 'her', ringed */}
          <ellipse cx="132" cy="126" rx="46" ry="19" stroke={SHE} strokeWidth="3" />

          {/* the model, shouting over it */}
          <path d="M330,84 L446,80 L450,164 L334,168 Z" />
          <path d="M470,44 L604,50 L598,150 L470,144 L446,124 Z" />
        </g>

        <g fontFamily="var(--font-mono)" textAnchor="middle">
          <text x="132" y="133" fontSize="24" fontWeight="700" fill={SHE}>
            her
          </text>
          <text x="390" y="130" fontSize="15" fontWeight="700" fill={INK}>
            MODEL
          </text>
          <text x="534" y="112" fontSize="42" fontWeight="700" fill={HE}>
            HE
          </text>
        </g>

        <g
          fill="none"
          stroke={INK}
          strokeOpacity="0.3"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M268,120 L318,120 M318,120 L306,111 M318,120 L306,129" />
        </g>
      </svg>
    </Plate>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · the mirror                                                             */
/* -------------------------------------------------------------------------- */

export function MirrorPlate() {
  return (
    <Plate
      width="36rem"
      caption="The same behaviour, learned twice, wired in opposite directions."
    >
      <svg viewBox="0 0 640 268" className="w-full h-auto" role="img">
        <Rough id="rgh-mirror" seed={27} />

        {/* the mirror itself */}
        <path
          d="M320,14 L320,254"
          stroke={INK}
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeDasharray="7 8"
        />

        <g
          filter="url(#rgh-mirror)"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M44,52 L282,46 L288,182 L50,188 Z" />
          <path d="M358,46 L596,52 L590,188 L352,182 Z" />
          <circle cx="166" cy="130" r="22" />
          <circle cx="474" cy="130" r="22" />
          <path d="M166,130 L182,116" strokeWidth="4" />
          <path d="M474,130 L458,116" strokeWidth="4" />
          <path d="M166,190 L166,216 M166,216 L158,206 M166,216 L174,206" />
          <path d="M474,190 L474,216 M474,216 L466,206 M474,216 L482,206" />
        </g>

        <circle cx="166" cy="130" r="14" fill={HE} fillOpacity="0.9" />
        <circle cx="474" cy="130" r="14" fill={SHE_FILL} />

        <g fontFamily="var(--font-mono)" textAnchor="middle" fill={INK}>
          <text x="166" y="84" fontSize="17" fontWeight="700">
            LLAMA-3.2-1B
          </text>
          <text x="474" y="84" fontSize="17" fontWeight="700">
            LFM2.5-230M
          </text>
          <text x="166" y="172" fontSize="13" fill={HE}>
            male-context
          </text>
          <text x="474" y="172" fontSize="13" fill={SHE}>
            female-context
          </text>
          <text x="166" y="248" fontSize="20" fontWeight="700" fillOpacity="0.75">
            “he”
          </text>
          <text x="474" y="248" fontSize="20" fontWeight="700" fillOpacity="0.75">
            “he”
          </text>
        </g>
      </svg>
    </Plate>
  );
}
