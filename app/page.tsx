'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ExperienceCard from "./components/ExperienceCard";
import SocialLinks from "./components/social-links";
import Link from "next/link";

const experiences = [
    {
    logo: "/logos/oneper.png",
    company: "1% Club",
    title: "SDE-1",
    location: "Bangalore",
    duration: "Dec 2025 – present",
    link: "https://www.onepercentclub.io/",
  },
      {
    logo: "/logos/grappus.png",
    company: "Grappus",
    title: "Backend Engineer",
    location: "Gurgoan",
    duration: "August 2025 – Nov 2025",
    link: "https://www.grappus.com/",
  },
    {
    logo: "/logos/stealthai.jpeg",
    company: "Stealth AI",
    title: "Full Stack AI Engineer",
    location: "South Delhi",
    duration: "June 2025 – August 2025",
    link: "https://www.linkedin.com/company/stealthaistartup/posts/?feedView=all",
  },
  {
    logo: "/logos/eightclub.jpeg",
    company: "8 club",
    title: "SDE Intern",
    location: "Bengaluru",
    duration: "Oct 2024 – May 2025",
    link: "https://www.8club.co/",
  },
  {
    logo: "/logos/stimulerai.png",
    company: "Stimuler AI",
    title: "SDE Intern",
    location: "Remote",
    duration: "June 2024 – Sept 2024",
    link: "https://stimuler.tech/",
  },
];

type TabKey = "museum" | "inspo" | "experiments";

// Heights normalized to ~110px so all three icons look evenly sized;
// widths follow each asset's native aspect ratio.
const ICONS: Array<{ key: TabKey; src: string; label: string; w: number; h: number; href?: string }> = [
  { key: "museum", src: "/articles.png", label: "museum", w: 70, h: 110, href: "/blogs" },
  { key: "inspo", src: "/inspo.png", label: "inspo", w: 70, h: 90, href: "/inspo" },
  { key: "experiments", src: "/experiments.png", label: "experiments", w: 90, h: 120, href: "/experiments" },
];

// Scatter positions around the me.png image. Anchored from bottom-right so they
// stay glued to the photo regardless of viewport width. me.png is 360x450 so the
// image occupies right:0–360, bottom:0–450; these positions hug those edges.
const WORK_SCATTER: Array<{ right: string; bottom: string; rotate: string }> = [
  { right: "340px", bottom: "380px", rotate: "-7deg" }, // top-left, slight overlap
  { right: "180px", bottom: "470px", rotate: "4deg" },  // top-mid, above image
  { right: "30px", bottom: "440px", rotate: "-3deg" },  // top-right, hugging top
  { right: "330px", bottom: "200px", rotate: "6deg" },  // mid-left
  { right: "290px", bottom: "60px", rotate: "-4deg" },  // bottom-left, slight overlap
];

export default function Home() {
  const [workExpanded, setWorkExpanded] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!workExpanded) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (cardsRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setWorkExpanded(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [workExpanded]);

  return (
    <main className="h-screen overflow-hidden bg-white text-[#191919] relative">
      {/* Bio: top-left */}
      <div className="absolute top-12 left-12 max-w-2xl text-sm text-[#191919] leading-relaxed space-y-1">
        <p>i&apos;m a software engineer who refused to stay in one lane.</p>
        <p>
          i build products, read philosophy, contribute to open source, and write about whatever&apos;s currently living rent-free in my head — tech or not.
        </p>
        <p>
          my latest obsession is{" "}
          <a
            href="https://lazysantara.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#191919]/70 transition-colors"
          >
            lazySantara
          </a>{" "}
          — a platform where ai agents and humans can post any real-world task, and someone nearby just... does it. literally anything. it&apos;s weird, it&apos;s useful, and i can&apos;t stop thinking about it.
        </p>
        <p>
          i&apos;ve contributed to LFX, CCExtractor, API Dash, and a few others. won hackathons at NIT Bhopal, IIITL, MMMUT, Foss Overflow, Bank of Baroda, E-Summit and more. led GDSC and was part of the E-Cell at my campus.
        </p>
        <p>
          outside of work i&apos;m usually chasing that specific feeling of understanding something deeply — a concept, a system, a person, a philosophy. still figuring most of it out.
        </p>
      </div>

      {/* Icon column: left-aligned, modest spacing between rows + tight label-to-image */}
      <div className="absolute left-12 top-[42%] flex flex-col gap-10 items-start">
        {ICONS.map((icon) => {
          const inner = (
            <>
              <Image
                src={icon.src}
                alt={icon.label}
                width={icon.w}
                height={icon.h}
                className={`object-contain transition-transform duration-200 group-hover:scale-105 block ${
                  icon.key === "inspo" ? "rounded-md" : ""
                }`}
                priority
              />
              <span
                className={`text-sm text-[#191919] leading-none ${
                  icon.key === "museum" ? "mt-1" : "mt-3"
                }`}
              >
                {icon.label}
              </span>
            </>
          );

          return (
            <Link
              key={icon.key}
              href={icon.href ?? "/"}
              className="group flex flex-col items-center cursor-pointer"
            >
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Social links: bottom-center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <SocialLinks />
      </div>

      {/* Experience cards scattered around me.png — emerge from "my work.ex" text */}
      <div ref={cardsRef}>
        {experiences.map((exp, index) => {
          const pos = WORK_SCATTER[index];
          return (
            <div
              key={`${exp.company}-${exp.duration}`}
              className="absolute z-10 w-[220px] origin-bottom-right transition-all duration-700 ease-out"
              style={{
                right: workExpanded ? pos.right : "430px",
                bottom: workExpanded ? pos.bottom : "140px",
                transform: workExpanded
                  ? `rotate(${pos.rotate}) scale(1)`
                  : "rotate(0deg) scale(0.05)",
                opacity: workExpanded ? 1 : 0,
                pointerEvents: workExpanded ? "auto" : "none",
                transitionDelay: workExpanded ? `${index * 120}ms` : "0ms",
              }}
            >
              <ExperienceCard {...exp} />
            </div>
          );
        })}
      </div>

      {/* me.png bottom-right + work.ex label, grouped so the label never gets clipped */}
      <div className="absolute bottom-0 right-0 flex items-end gap-6">
        <button
          ref={buttonRef}
          onClick={() => setWorkExpanded(true)}
          className="mb-32 text-xl text-[#191919] hover:text-[#191919]/70 transition-colors cursor-pointer whitespace-nowrap relative z-20"
        >
          *(my work.ex)
        </button>
        <Image
          src="/me.png"
          alt="Shivam"
          width={360}
          height={450}
          className="object-contain pointer-events-none select-none"
          priority
        />
      </div>

    </main>
  );
}
