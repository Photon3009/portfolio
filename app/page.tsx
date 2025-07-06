'use client'

import Image from "next/image";
import { useState } from "react";
import SocialLinks from "./components/social-links";
import ConceptLinks from "./components/concept-links";
import ExperienceCard from "./components/ExperienceCard";
import ProjectCard from "./components/ProjectCard";
import Link from "next/link";

const experiences = [
 
  {
    logo: "/logos/stealthai.jpeg",
    company: "Stealth AI",
    title: "Full Stack AI Engineer",
    location: "South Delhi",
    duration: "June 2025 – Present",
     link:"https://www.linkedin.com/company/stealthaistartup/posts/?feedView=all"
  },
  {
    logo: "/logos/eightclub.jpeg",
    company: "8 club",
    title: "SDE Intern",
    location: "Bengaluru",
    duration: "Oct 2024 – May 2025",
    link:"https://www.8club.co/"
  }, 
  {
    logo: "/logos/stimulerai.png",
    company: "Stimuler AI",
    title: "SDE Intern",
    location: "Remote",
    duration: "June 2024 – Sept 2024",
    link:"https://stimuler.tech/"
  }
];


const projects = [
  {
    name: "AI voice agent with Outbound calls",
    description: "An AI-powered voice assistant capable of making automated outbound calls using a robust architecture combining Twilio SIP, LiveKit, and speech-to-text/text-to-speech models. The system dynamically converses with users in real-time, leveraging LLMs for intelligent responses, and uses LiveKit for low-latency audio streaming. Built to handle scalable call campaigns, real-time call routing, and contextual dialogue flow, making it ideal for use cases like customer support, surveys, and lead generation.",
    image: "/projects/voiceaiagent.svg",
    link: "https://github.com/Photon3009/debt-collector-voice-agent",
  },
  {
    name: "cisoinbox",
    description: "An end-to-end system that syncs multiple IMAP inboxes in real-time, categorizes incoming emails using AI, stores and indexes them in Elasticsearch, and provides a web-based UI to search and manage conversations. Includes Slack and Webhook integrations and AI-powered reply suggestions using RAG.",
    image: "/projects/ciso.png",
    link: "https://github.com/Photon3009/cisoinbox",
  },
  {
    name: "Sentiment Analyzer",
    description: "A full-stack web application that analyzes the sentiment of reviews of a Google Play Store app using FastAPI and typescript.",
    image: "/projects/sentiment.webp",
    link: "https://github.com/Photon3009/Play-Store-review-sentiment-analyzer",
  },
  {
    name: "Multi-Agent Tutoring Bot",
    description: "This assistant (the Tutor Agent) handle questions across different subjects. Instead of being a monolithic system, it will intelligently route questions to specialized agents, each an expert in its domain (e.g., mathematics, physics). These specialist agents might also need to use tools (like a calculator or a data lookup function) to provide accurate answers.",
    image: "/projects/agentbot.png",
    link: "https://github.com/Photon3009/Multi-Agent-Tutoring-Bot", // internal route example
  },
  {
    name: "Abnormal File Vault",
    description: "A full-stack, secure and efficient file hosting application. Using React, Django, and Docker, you will implement: File Deduplication – Optimizing storage efficiency by eliminating redundant files. Search & Filtering – Enabling users to efficiently retrieve files based on multiple attributes.",
    image: "/projects/vault.avif",
    link: "https://github.com/Photon3009/abnormal-file-vault", // internal route example
  },
  {
    name: "Wi-Desktop App",
    description: "This project involves building a Windows-compatible Flutter application that allows users to log in via an API and, upon successful login, displays live CPU and RAM usage. The system fetches real-time system metrics from a C++ Windows service, which updates the Flutter UI every 5 seconds. It tests frontend responsiveness, backend integration, and desktop app development using Flutter and C++.",
    image: "/projects/wijungle.png",
    link: "https://github.com/Photon3009/WiJungle", // internal route example
  },
  {
    name: "Hackmate App",
    description: "A flutter app that matches hackathon participants with like-minded individuals who share common interests and goals. If two users swipe right on each other, they can start chatting within the app to discuss their project ideas and goals.",
    image: "/projects/hackmate.png",
    link: "https://github.com/Photon3009/Hackmate", // internal route example
  },
  {
    name: "Auberge App",
    description: "A Flutter-based hostel management app that streamlines announcements, maintenance, and mess tracking. It enables residents to view menus, submit complaints, and rate food—all in one sleek interface. Built with Firebase and Google Sheets API, it’s efficient, user-friendly, and open-source.",
    image: "/projects/auberge.gif",
    link: "https://github.com/Photon3009/Auberge", // internal route example
  },
];

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<"work" | "projects" | "museum" | null>(null);

  const toggleTab = (tab: "work" | "projects" | "museum") => {
    setSelectedTab(prev => (prev === tab ? null : tab));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "work":
        return (
          <div className="pt-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
        );
      case "projects":
        return (
          <div className="space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.name}
          name={project.name}
          description={project.description}
          image={project.image}
          link={project.link}
        />
      ))}
    </div>
        );
      case "museum":
        return (
          <div className="text-white/70 space-y-4">
          <p>
            A collection of all my blogs, learnings, and experiments—documented for reference and exploration.
          </p>
          <Link href="/blogs" passHref>
            <img
              src="/logos/museum.svg" // replace with your image path
              alt="Go to Museum"
              className="w-62 max-w-md rounded-lg hover:opacity-80 transition duration-200 cursor-pointer"
            />
          </Link>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#101010] text-white p-16">
      <div className="max-w-4xl mx-auto flex flex-col h-full min-h-screen mt-4">

        {/* Top Section: Text left + Profile right */}
        <div className="flex justify-between items-start gap-8">
          {/* Text Content */}
          <div className="space-y-4 max-w-xl">

            <h1 className="text-2xl font-normal"> shivam verma</h1>

            <p className="text-white/90">
              a software engineer, cooking something called{" "}
    
              <a
                href="https://apollo-6fr0.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                muze
              </a>
              —so you&apos;ll never let your good content
              gather dust again
            </p>

            <p className="text-white/90">
              code in typescript, fastAPI, node, react, flutter and any other tech as needed
              <br />
              worked with 8club, stimulerAI, goglobally
              <br />
              contributed to   <a
    href="https://www.credly.com/badges/cea0702a-40a3-478f-9669-44f46e68eaa6/twitter"
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-white"
  >
    LFX
  </a>, cc-extractor, api-dash &amp; more
              <br />
              won hackathons @NIT bhopal, IIITL, MMMUT
            </p>

            {/* Tab Links */}
            <div className="flex space-x-4">
            {(["work", "projects", "museum"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => toggleTab(tab)}
                  className={`transition-colors ${
                    selectedTab === tab
                      ? "text-white font-semibold"
                      : "text-white/30 hover:text-white/90"
                  }`}
                >
                  {tab === "work" ? "work.ex" : tab}
                </button>
              ))}
            </div>

            {/* Render tab content */}
            <div className="pt-4">{renderContent()}</div>
          </div>

          {/* Profile + Social Links */}
          <div className="w-48 flex flex-col items-center shrink-0">
            <div className="w-52 h-60 relative overflow-hidden mb-4">
              <Image
                src="/projects/shivam.svg?height=192&width=192"
                alt="Profile photo"
                width={232}
                height={292}
                className="object-cover"
                priority
              />
            </div>
            <SocialLinks />
          </div>
        </div>

        {/* Bottom Right Section */}
        <div className="mt-auto text-right self-end">
          <p className="text-sm text-white/70 mb-2">
            if you want to
            <br />
            understand these concepts as if
            <br />
            you&apos;re five
          </p>
          <div className="inline-block">
            <ConceptLinks />
          </div>
        </div>

      </div>
    </main>
  );
}
