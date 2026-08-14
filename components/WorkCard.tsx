import Image from "next/image";
import Link from "next/link";
import { Video } from "@/lib/portfolio";
import { IconPlay } from "./Icons";

export default function WorkCard({
  work,
  large = false,
  instant = false,
}: {
  work: Video;
  large?: boolean;
  instant?: boolean;
}) {
  const hasVideo = Boolean(work.youtubeId || work.vimeoId);

  return (
    <article className={instant ? "group" : "reveal group"}>
      <Link href={`/realisations/${work.id}`} className="block">
        <div
          className={`relative overflow-hidden rounded-xl border border-border ${
            work.vertical ? "aspect-[2/3]" : large ? "aspect-[16/9]" : "aspect-video"
          }`}
        >
          <Image
            src={work.image}
            alt={`${work.title} — ${work.category}`}
            fill
            sizes={large ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-500 grid place-items-center">
            {hasVideo && (
              <span className="h-14 w-14 rounded-full bg-white/90 backdrop-blur grid place-items-center text-gold-ink opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 shadow-lg">
                <IconPlay className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 px-1">
          <p className="text-[11px] uppercase tracking-widest text-gold-ink font-display font-semibold">
            {work.category}
          </p>
          <h3
            className={`font-display font-bold leading-tight mt-1 group-hover:text-gold-ink transition-colors ${
              large ? "text-xl" : "text-base"
            }`}
          >
            {work.title}
          </h3>
          {work.description && (
            <p className="text-muted text-sm mt-1.5 leading-relaxed line-clamp-2">
              {work.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
