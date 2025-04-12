import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101010] text-white p-8 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex gap-8 mb-16 mt-16">
          {/* Profile image */}
          <div className="w-48 flex flex-col items-center">
            <div className="w-48 h-90 relative overflow-hidden mb-4">
              <Image
                src="/os.jpg?height=1000&width=606"
                alt="Operating Systems: Three Easy Pieces"
                width={198}
                height={400}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-4">
            <h1 className="text-2xl font-normal">
              Operating Systems: Three Easy Pieces
            </h1>

            <p className="text-white/90">
              {" "}
              <Link
                href="https://pages.cs.wisc.edu/~remzi/OSTEP/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
                Link to the book
              </Link>
            </p>

            <p className="text-white/90">
              If you’re a visual learner, follow this YouTube channel — most
              of your fundamentals will be covered:
              <br />
              <Link
                href="https://www.youtube.com/@CoreDumpped"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
                Core dumped - youtube
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
