import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface Project {
  name: string;
  description: ReactNode;
  image: string;
  link?: string;
}

const projects: Project[] = [
  {
    name: "Sense",
    image: "/projects/sense.png",
    link: "https://chromewebstore.google.com/detail/sense/ffebbefapkicgiaffdjihkpaoglblfia",
    description: (
      <>
        <strong>Sense</strong> is a browser extension that helps you understand text{" "}
        <em>in context</em>, not just as isolated dictionary definitions. Instead of sending your
        data to the cloud, it runs AI locally using WebGPU, giving you instant, private, and
        unlimited explanations right inside your browser. Just highlight any word or sentence, and
        Sense explains what it means <em>in that specific situation</em>—making reading smoother,
        faster, and distraction-free.
      </>
    ),
  },
  {
    name: "Formula 1, Explained for Rookies",
    image: "/projects/f1.png",
    link: "https://f1-for-rookies.vercel.app/",
    description: (
      <>
        From 230 mph speeds to cutting-edge engineering, Formula 1 is where sport meets science at
        its absolute limit. This beginner-friendly guide breaks down the chaos, strategy, and
        innovation behind the grid—so you can understand why millions around the world are hooked
        on what&apos;s often called the most expensive experiment in entertainment.
      </>
    ),
  },
  {
    name: "AI voice agent with Outbound calls",
    description:
      "An AI-powered voice assistant capable of making automated outbound calls using a robust architecture combining Twilio SIP, LiveKit, and speech-to-text/text-to-speech models. The system dynamically converses with users in real-time, leveraging LLMs for intelligent responses, and uses LiveKit for low-latency audio streaming. Built to handle scalable call campaigns, real-time call routing, and contextual dialogue flow, making it ideal for use cases like customer support, surveys, and lead generation.",
    image: "/projects/voiceaiagent.svg",
    link: "https://github.com/Photon3009/debt-collector-voice-agent",
  },
  {
    name: "cisoinbox",
    description:
      "An end-to-end system that syncs multiple IMAP inboxes in real-time, categorizes incoming emails using AI, stores and indexes them in Elasticsearch, and provides a web-based UI to search and manage conversations. Includes Slack and Webhook integrations and AI-powered reply suggestions using RAG.",
    image: "/projects/ciso.png",
    link: "https://github.com/Photon3009/cisoinbox",
  },
  {
    name: "Multi-Agent Tutoring Bot",
    description:
      "This assistant (the Tutor Agent) handle questions across different subjects. Instead of being a monolithic system, it will intelligently route questions to specialized agents, each an expert in its domain (e.g., mathematics, physics). These specialist agents might also need to use tools (like a calculator or a data lookup function) to provide accurate answers.",
    image: "/projects/agentbot.png",
    link: "https://github.com/Photon3009/Multi-Agent-Tutoring-Bot",
  },
  {
    name: "Abnormal File Vault",
    description:
      "A full-stack, secure and efficient file hosting application. Using React, Django, and Docker, you will implement: File Deduplication – Optimizing storage efficiency by eliminating redundant files. Search & Filtering – Enabling users to efficiently retrieve files based on multiple attributes.",
    image: "/projects/vault.avif",
    link: "https://github.com/Photon3009/abnormal-file-vault",
  },
  {
    name: "Wi-Desktop App",
    description:
      "This project involves building a Windows-compatible Flutter application that allows users to log in via an API and, upon successful login, displays live CPU and RAM usage. The system fetches real-time system metrics from a C++ Windows service, which updates the Flutter UI every 5 seconds. It tests frontend responsiveness, backend integration, and desktop app development using Flutter and C++.",
    image: "/projects/wijungle.png",
    link: "https://github.com/Photon3009/WiJungle",
  },
  {
    name: "Sentiment Analyzer",
    description:
      "A full-stack web application that analyzes the sentiment of reviews of a Google Play Store app using FastAPI and typescript.",
    image: "/projects/sentiment.png",
    link: "https://github.com/Photon3009/Play-Store-review-sentiment-analyzer",
  },
  {
    name: "Hackmate App",
    description:
      "A flutter app that matches hackathon participants with like-minded individuals who share common interests and goals. If two users swipe right on each other, they can start chatting within the app to discuss their project ideas and goals.",
    image: "/projects/hackmate.png",
    link: "https://github.com/Photon3009/Hackmate",
  },
  {
    name: "Auberge App",
    description:
      "A Flutter-based hostel management app that streamlines announcements, maintenance, and mess tracking. It enables residents to view menus, submit complaints, and rate food—all in one sleek interface. Built with Firebase and Google Sheets API, it’s efficient, user-friendly, and open-source.",
    image: "/projects/auberge.gif",
    link: "https://github.com/Photon3009/Auberge",
  },
];

function Card({ project }: { project: Project }) {
  const content = (
    <div className="group flex flex-col gap-3 p-4 rounded-lg border border-[#191919]/10 bg-white hover:bg-[#191919]/5 transition-colors h-full">
      <div className="relative w-full h-44 rounded overflow-hidden bg-[#191919]/5">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-[#191919]">{project.name}</h3>
        <p className="text-[#191919]/80 text-sm mt-1 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );

  return project.link ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </a>
  ) : (
    <div className="h-full">{content}</div>
  );
}

export default function ExperimentsPage() {
  return (
    <main className="min-h-screen bg-white text-[#191919]">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-sm text-[#191919]/60 hover:text-[#191919] transition-colors"
        >
          ← back
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-3">experiments</h1>
        <p className="text-[#191919]/70 mb-12 leading-relaxed">
          things i&apos;ve built — products, side projects, and weekend tinkers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.name} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
