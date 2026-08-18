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

// Desktop scatter: me.png is 360x450, anchored bottom-right.
const WORK_SCATTER: Array<{ right: string; bottom: string; rotate: string }> = [
  { right: "340px", bottom: "380px", rotate: "-7deg" }, // top-left, slight overlap
  { right: "180px", bottom: "470px", rotate: "4deg" },  // top-mid, above image
  { right: "30px", bottom: "440px", rotate: "-3deg" },  // top-right, hugging top
  { right: "330px", bottom: "200px", rotate: "6deg" },  // mid-left
  { right: "290px", bottom: "60px", rotate: "-4deg" },  // bottom-left, slight overlap
];

// Mobile scatter: me.png renders ~176x220, cards are w-[160px]. Tighter cluster.
const WORK_SCATTER_MOBILE: Array<{ right: string; bottom: string; rotate: string }> = [
  { right: "10px", bottom: "235px", rotate: "-5deg" },  // just above image, right
  { right: "130px", bottom: "215px", rotate: "4deg" },  // just above, leaning left
  { right: "150px", bottom: "110px", rotate: "-7deg" }, // mid-left, overlapping image
  { right: "50px", bottom: "340px", rotate: "5deg" },   // higher up
  { right: "140px", bottom: "25px", rotate: "-3deg" },  // bottom-left, slight overlap
];

export default function Home() {
  const [workExpanded, setWorkExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const positions = isMobile ? WORK_SCATTER_MOBILE : WORK_SCATTER;
  // Origin point near the "*(my work.ex)" button so cards appear to emerge from it.
  const originRight = isMobile ? "200px" : "430px";
  const originBottom = isMobile ? "70px" : "140px";

  return (
    <main className="min-h-screen pb-56 md:pb-0 md:h-screen md:overflow-hidden bg-white text-[#191919] relative">
      {/* Bio: in flow on mobile, absolute top-left on desktop */}
      <div className="px-6 pt-10 md:px-0 md:pt-0 md:absolute md:top-12 md:left-12 max-w-2xl text-sm text-[#191919] leading-relaxed space-y-2 md:space-y-1">
        <p>i&apos;m a software engineer who refuses to stay in one lane.</p>
        <p>
          i build products, obsess over ai, contribute to open source, and write about whatever i&apos;m learning. lately, i&apos;ve been spending most of my time exploring{" "}
          <Link
            href="/blogs/mechanic-is-a-man"
            className="underline hover:text-[#191919]/70 transition-colors"
          >
            mechanistic interpretability
          </Link>{" "}
          and ai alignment.
        </p>
        <p>
          i&apos;m currently building{" "}
          <a
            href="https://lazysantara.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:text-[#191919]/70 transition-colors"
          >
            lazysantara
          </a>
          , a weird little experiment around ai agents, humans, and getting things done in the real world, along with{" "}
          <span className="font-medium">muze</span>, a mac app that curates what you consume and resurfaces it when it matters.
        </p>
        <p>
          i&apos;ve contributed to lfx, ccextractor, and api dash, won multiple hackathons, and previously led gdsc at my college.
        </p>
        <p>
          outside of work, you&apos;ll usually find me reading papers, playing the guitar, writing the occasional song, or chasing the feeling of understanding something deeply.
        </p>
      </div>

      {/* Icons: horizontal row on mobile, vertical column on desktop */}
      <div className="px-6 mt-8 flex flex-row gap-8 items-end justify-start md:px-0 md:mt-0 md:absolute md:left-12 md:top-[42%] md:flex-col md:gap-10 md:items-start">
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

      {/* me.png + work.ex: pinned to bottom-right corner on every breakpoint */}
      <div className="absolute bottom-0 right-0 flex items-end gap-3 md:gap-6">
        <button
          ref={buttonRef}
          onClick={() => setWorkExpanded((v) => !v)}
          className="mb-16 md:mb-32 text-base md:text-xl text-[#191919] hover:text-[#191919]/70 transition-colors cursor-pointer whitespace-nowrap relative z-20"
        >
          *(my work.ex)
        </button>
        <Image
          src="/me.png"
          alt="Shivam"
          width={360}
          height={450}
          className="object-contain pointer-events-none select-none w-44 md:w-[360px] h-auto"
          priority
        />
      </div>

      {/* Experience cards scattered around me.png — emerge from "my work.ex" text */}
      <div ref={cardsRef}>
        {experiences.map((exp, index) => {
          const pos = positions[index];
          return (
            <div
              key={`${exp.company}-${exp.duration}`}
              className="absolute z-10 w-[160px] md:w-[220px] origin-bottom-right transition-all duration-700 ease-out"
              style={{
                right: workExpanded ? pos.right : originRight,
                bottom: workExpanded ? pos.bottom : originBottom,
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

      {/* Social links: in flow at bottom on mobile, fixed bottom-center on desktop */}
      <div className="mt-10 mb-8 flex justify-center md:mt-0 md:mb-0 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-20">
        <SocialLinks />
      </div>
    </main>
  );
}
