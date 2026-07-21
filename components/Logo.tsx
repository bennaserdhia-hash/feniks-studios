import Link from "next/link";
import Image from "next/image";
import logo from "@/public/brand/logo.png";

export default function Logo({ className = "h-11" }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex items-center group" aria-label="Feniks Studios — accueil">
      <Image
        src={logo}
        alt="Feniks Studios"
        priority
        sizes="140px"
        className={`${className} w-auto transition-transform duration-500 group-hover:scale-[1.03]`}
      />
    </Link>
  );
}
