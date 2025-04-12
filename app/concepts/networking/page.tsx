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
                src="/networking.jpg?height=1000&width=606"
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
            Computer Networking: A Top Down Approach
            </h1>

            <p className="text-white/90">
              {" "}
              <Link
                href="https://www.ucg.ac.me/skladiste/blog_44233/objava_64433/fajlovi/Computer%20Networking%20_%20A%20Top%20Down%20Approach,%207th,%20converted.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
                Link to the book
              </Link>
            </p>

            <p className="text-white/90">
              If you’re a visual learner, these are some good youtube video you can watch:
              <br />
            
             
            </p>
            <p><Link
                href="https://youtu.be/-6Uoku-M6oY"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
                The OSI Model Animation
              </Link></p>
              <p><Link
                href="https://youtu.be/O7CuFlM4V54"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
                Packet movement in networks
              </Link></p>
              <p><Link
                href="https://youtu.be/9BGWrLiT9qs?si=P3LrdZKH9PPGOXb7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
              Life of an IP packet
              </Link></p>
              <p><Link
                href="https://youtu.be/i5oe63pOhLI?si=gCNya_KDrk1xJrhp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400  hover:text-cyan-300"
              >
               Working of internet
              </Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}
