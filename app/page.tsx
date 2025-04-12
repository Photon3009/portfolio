import Image from "next/image"
import Link from "next/link"
import SocialLinks from "./components/social-links"
import ConceptLinks from "./components/concept-links"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101010] text-white p-8 flex flex-col ">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex gap-8 mb-16 mt-16">
          {/* Profile image + Social links */}
          <div className="w-48 flex flex-col items-center">
            <div className="w-48 h-48 relative overflow-hidden mb-4">
              <Image
                src="/me.svg?height=192&width=192"
                alt="Profile photo"
                width={192}
                height={192}
                className="object-cover"
                priority
              />
            </div>
            <SocialLinks />
          </div>

          {/* Text content */}
          <div className="space-y-2">
            <h1 className="text-2xl font-normal">engineer, 2025 passout</h1>

            <p className="text-white/90">
              cooking something called muze—so you&apos;ll never let your good content
              <br />
              gather dust again
            </p>

            <p className="text-white/90">
              code in flutter, next.js, fastAPI and any other tech as needed
              <br />
              worked with 8club, stimulerAI, goglobally
              <br />
              contributed to LFX, cc-extractor, api-dash &amp; more
              <br />
              won hackathons @NIT bhopal, IIITL, MMMUT
            </p>

            <Link
              href="/blogs"
              className="text-white/30  hover:text-white/70 transition-colors"
            >
              museum 
            </Link> 
          
          </div>
        </div>

        <div className="mt-auto mb-4">
          <p className="text-sm mb-4 text-white/70">
            if you want to
            <br />
            understand these concepts as if
            <br />
            you&apos;re five
          </p>

          <ConceptLinks />
        </div>
      </div>
    </main>
  )
}
