import Link from "next/link"

export default function SocialLinks() {
  const socials = [
    { name: "x", url: "https://x.com/photon3009" },
    { name: "gh", url: "https://github.com/Photon3009" },
    { name: "in", url: "https://www.linkedin.com/in/shivam-verma-1554b9223/" },
    { name: "m", url: "https://medium.com/@sv30092001" },
  ]

  return (
    <div className="flex items-center flex-wrap text-sm text-white/80">
      {socials.map((social, index) => (
        <span key={social.name} className="flex items-center">
          <Link
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            {social.name}
          </Link>
          {index < socials.length - 1 && <span className="mx-2">•</span>}
        </span>
      ))}
    </div>
  )
}
