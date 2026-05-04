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
      <div className="flex items-start gap-2.5 p-2.5 rounded-md border border-[#191919]/10 bg-white shadow-sm hover:bg-[#191919]/5 transition-colors cursor-pointer">
        {/* Logo */}
        <div className="w-8 h-8 relative shrink-0">
          <Image
            src={logo}
            alt={`${company} logo`}
            fill
            className="object-contain rounded"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col leading-tight min-w-0">
          <h3 className="text-[#191919] text-xs font-medium truncate">{title}</h3>
          <p className="text-[#191919]/80 text-[11px] truncate">
            {company} · {location}
          </p>
          <p className="text-[#191919]/50 text-[10px]">{duration}</p>
        </div>
      </div>
    </Link>
  );
}
