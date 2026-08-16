"use client";

import { useEffect, useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // clipboard blocked (http, permissions) — leave the url in the bar for manual copy
    }
  }

  return (
    <button
      onClick={copy}
      className="lw-meta text-sm text-[#191919]/60 hover:text-[#191919] transition-colors"
    >
      {copied ? "link copied" : "copy link"}
    </button>
  );
}
