import Link from "next/link"

export default function SocialLinks() {
  const socials = [
    { name: "medium", url: "https://medium.com/@sv30092001" },
    { name: "github", url: "https://github.com/Photon3009" },
    { name: "linkedin", url: "https://www.linkedin.com/in/shivam-verma-1554b9223/" },
    { name: "x(twitter)", url: "https://x.com/sheeeevam" },
    { name: "substack", url: "https://substack.com/@seawam" },
  ]

  // mailto: is not http, so it must not get target="_blank" — that opens a
  // dead tab in some browsers before handing off to the mail client.
  const contacts = [{ name: "email", url: "mailto:shivam.vermaa30@gmail.com" }]

  const style = "hover:text-[#191919] transition-colors"

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 text-sm text-[#191919]/40 md:gap-8 md:px-0">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={style}
        >
          {social.name}
        </Link>
      ))}

      {contacts.map((c) => (
        <a key={c.name} href={c.url} className={style}>
          {c.name}
        </a>
      ))}
    </div>
  )
}
