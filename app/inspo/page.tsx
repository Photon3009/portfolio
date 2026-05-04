import Link from "next/link";

interface Inspiration {
  name: string;
  role: string;
  url: string;
}

const inspirations: Inspiration[] = [
  { name: "raman negi", role: "musician", url: "https://www.instagram.com/negiraman/" },
  { name: "charlotte brontë", role: "author", url: "https://en.wikipedia.org/wiki/Charlotte_Bront%C3%AB" },
  { name: "fidji simo", role: "ceo of applications, openai", url: "https://www.linkedin.com/in/fidjisimo/" },
  { name: "gaurav kapadia", role: "founder, xn", url: "https://x.com/gauravkapadia" },
  { name: "guillermo rauch", role: "founder, vercel", url: "https://x.com/rauchg" },
  { name: "hunt slonem", role: "artist", url: "https://www.huntslonem.com/" },
  { name: "i. m. pei", role: "architect", url: "https://en.wikipedia.org/wiki/I._M._Pei" },
  { name: "jae woo lee", role: "computer science professor, columbia", url: "https://www.cs.columbia.edu/~jae/" },
  { name: "jessica livingston", role: "co-founder, y combinator", url: "https://www.linkedin.com/in/jessicalivingston1/" },
  { name: "kobe bryant", role: "former professional basketball player", url: "https://en.wikipedia.org/wiki/Kobe_Bryant" },
  { name: "leonardo da vinci", role: "polymath", url: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci" },
  { name: "michael jordan", role: "former professional basketball player", url: "https://en.wikipedia.org/wiki/Michael_Jordan" },
  { name: "michael ovitz", role: "founder, caa", url: "https://www.michaelovitz.com/" },
  { name: "patrick collison", role: "co-founder, stripe", url: "https://patrickcollison.com/" },
  { name: "virgil abloh", role: "fashion designer", url: "https://en.wikipedia.org/wiki/Virgil_Abloh" },
];

export default function InspoPage() {
  return (
    <main className="min-h-screen bg-white text-[#191919]">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="text-sm text-[#191919]/60 hover:text-[#191919] transition-colors"
        >
          ← back
        </Link>

        <h1 className="text-3xl font-semibold mt-8 mb-3">inspo</h1>
        <p className="text-[#191919]/70 mb-8 leading-relaxed">
          a collection of people from various disciplines who inspire me (more to add)
        </p>

        <ul className="space-y-2.5 leading-relaxed">
          {inspirations.map((p) => (
            <li key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#191919]/70 transition-colors"
              >
                {p.name}
              </a>{" "}
              <span className="text-[#191919]/60">({p.role})</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
