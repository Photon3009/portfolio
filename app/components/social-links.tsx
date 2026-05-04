import Link from "next/link"

export default function SocialLinks() {
  const socials = [
    { name: "medium", url: "https://medium.com/@sv30092001" },
    { name: "github", url: "https://github.com/Photon3009" },
    { name: "linkedin", url: "https://www.linkedin.com/in/shivam-verma-1554b9223/" },
    { name: "x(twitter)", url: "https://x.com/sheeeevam" },
    { name: "substack", url: "https://substack.com/@seawam" },
  ]

  return (
    <div className="flex items-center justify-center gap-8 text-sm text-[#191919]/40">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target={social.url.startsWith("http") ? "_blank" : undefined}
          rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
          className="hover:text-[#191919] transition-colors"
        >
          {social.name}
        </Link>
      ))}
    </div>
  )
}
