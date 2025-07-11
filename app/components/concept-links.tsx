import Link from "next/link"

export default function ConceptLinks() {
  const concepts = [
    { name: "os", path: "/concepts/os" },
    { name: "networking", path: "/concepts/networking" },
    { name: "System Design", path: "https://medium.com/@shivambhadani_/system-design-for-beginners-everything-you-need-in-one-article-c74eb702540b" },
  ]

  return (
    <div className="space-y-1 text-right">
      {concepts.map((concept) => (
        <div key={concept.path}>
          <Link
            href={concept.path}
            className="hover:text-gray-400 transition-colors"
          >
            {concept.name}
          </Link>
        </div>
      ))}
    </div>
  )
}
