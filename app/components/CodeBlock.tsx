"use client";

import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/themes/prism-tomorrow.css";

interface CodeBlockProps {
  code: string;
  language: "ts" | "tsx" | "js" | "jsx" | "json" | "bash" | string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [code]);

  return (
    <pre className="rounded-lg overflow-x-auto bg-[#2d2d2d] text-sm p-4 my-4">
      <code ref={ref} className={`language-${language}`}>
        {code.trim()}
      </code>
    </pre>
  );
}
