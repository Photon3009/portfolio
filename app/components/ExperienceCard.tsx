import Image from "next/image";
import Link from "next/link";

interface ExperienceCardProps {
  logo: string;
  company: string;
  title: string;
  location: string;
  duration: string;
  link: string; 
}

export default function ExperienceCard({
  logo,
  company,
  title,
  location,
  duration,
  link,
}: ExperienceCardProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <div className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-white/5 mb-4 hover:bg-white/10 transition-colors cursor-pointer">
        {/* Logo */}
        <div className="w-12 h-12 relative shrink-0">
          <Image
            src={logo}
            alt={`${company} logo`}
            fill
            className="object-contain rounded"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <h3 className="text-white text-base">{title}</h3>
          <p className="text-white/80 text-sm">
            {company} · {location}
          </p>
          <p className="text-white/50 text-sm">{duration}</p>
        </div>
      </div>
    </Link>
  );
}
