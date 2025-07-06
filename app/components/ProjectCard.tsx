import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  name: string;
  description: string;
  image: string;
  link?: string;
}

export default function ProjectCard({
  name,
  description,
  image,
  link,
}: ProjectCardProps) {
  const content = (
    <div className="group w-full max-w-4xl mx-auto flex flex-col gap-3 p-4 mb-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
      
      {/* Text Content at Top */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <p className="text-white/80 text-sm mt-1">{description}</p>
      </div>

      {/* Full-width Image at Bottom */}
      <div className="relative w-full h-38 rounded overflow-hidden">
        <Image
          src={image}
          alt={`${name} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );

  return link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    content
  );
}
