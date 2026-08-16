"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  VIEW_BASELINE,
  fetchViews,
  formatCount,
  viewsConfigured,
} from "../lib/engagement";

const RED = "#C62828";

/**
 * Total views, counted by a very enthusiastic cat.
 *
 * The icon replaces the word "views", so the accessible name has to carry it
 * instead — hence aria-label and title. The digit roll is skipped under
 * prefers-reduced-motion.
 */
export default function ViewCount() {
  const [target, setTarget] = useState(VIEW_BASELINE);
  const [shown, setShown] = useState(VIEW_BASELINE);
  const [hover, setHover] = useState(false);

  const calm =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!viewsConfigured) return;
    let alive = true;
    fetchViews().then((n) => {
      if (alive && n !== null) setTarget(n);
    });
    return () => {
      alive = false;
    };
  }, []);

  /* roll the digits up to whatever arrived */
  useEffect(() => {
    if (calm || target === shown) {
      setShown(target);
      return;
    }
    const from = shown;
    const delta = target - from;
    const start = performance.now();
    const DUR = 900;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DUR);
      setShown(Math.round(from + delta * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // rolling toward a new target; `shown` is the start value, not a trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, calm]);

  return (
    <span
      className="inline-flex items-center gap-1.5 select-none"
      title={`${formatCount(shown)} views`}
      aria-label={`${formatCount(shown)} views`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src="/cat.png"
        alt=""
        width={38}
        height={34}
        aria-hidden="true"
        className="h-[34px] w-auto"
        style={{
          transform:
            hover && !calm ? "rotate(-7deg) scale(1.14)" : "rotate(0) scale(1)",
          transition: "transform 260ms cubic-bezier(.34,1.56,.64,1)",
        }}
      />
      <span
        className="font-mono text-[13px] tabular-nums transition-colors duration-200"
        style={{ color: hover ? RED : "rgba(25,25,25,0.6)" }}
      >
        {formatCount(shown)}
      </span>
    </span>
  );
}
