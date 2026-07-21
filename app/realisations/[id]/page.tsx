import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import WorkCard from "@/components/WorkCard";
import { getVideos, embedUrl, watchUrl } from "@/lib/portfolio";
import { IconArrow, IconPlay } from "@/components/Icons";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = (await getVideos()).find((v) => v.id === id);
  if (!video) return { title: "Réalisation introuvable" };
  return {
    title: `${video.title} — ${video.category}`,
    description: video.description?.slice(0, 160),
    openGraph: {
      title: `${video.title} — Feniks Studios`,
      description: video.description?.slice(0, 200),
      images: video.image ? [video.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const videos = await getVideos();
  const video = videos.find((v) => v.id === id);
  if (!video) notFound();

  const embed = embedUrl(video);
  const watch = watchUrl(video);
  const others = videos.filter((v) => v.id !== video.id && v.category === video.category).slice(0, 3);
  const fallback = videos.filter((v) => v.id !== video.id).slice(0, 3);
  const suggestions = others.length ? others : fallback;

  return (
    <>
      <Section className="pt-32 md:pt-40 !pb-10">
        <Link
          href="/realisations"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold-ink transition-colors mb-8"
        >
          <IconArrow className="h-4 w-4 rotate-180" /> Toutes les réalisations
        </Link>

        <p className="eyebrow mb-3">{video.categoryLabel || video.category}</p>
        <h1 className="font-display font-black uppercase leading-[1.02] tracking-tight text-[clamp(2rem,5.5vw,3.8rem)] max-w-4xl">
          {video.title}
        </h1>
      </Section>

      {/* Lecteur */}
      <Section className="!pt-4 !pb-10">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-surface-2 shadow-[0_40px_80px_-40px_rgba(120,90,30,0.35)]">
          {embed ? (
            <iframe
              src={embed}
              title={video.title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <Image
              src={video.image}
              alt={video.title}
              fill
              sizes="(max-width:1200px) 100vw, 1200px"
              className="object-cover"
            />
          )}
        </div>

        {watch && (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href={watch} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <IconPlay className="h-4 w-4" /> Voir sur {video.youtubeId ? "YouTube" : "Vimeo"}
            </a>
            <Link href="/contact" className="btn btn-gold">
              Un projet similaire ? <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Section>

      {/* Description */}
      <Section className="!pt-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-14">
          <div>
            <span className="gold-line mb-5 block" />
            <h2 className="font-display text-xl font-extrabold">Le projet</h2>
          </div>
          <div className="space-y-5">
            {video.description && (
              <p className="text-lg leading-relaxed text-foreground/90">{video.description}</p>
            )}
            {video.details?.map((d, i) => (
              <p key={i} className="text-muted leading-relaxed">
                {d}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Section className="border-t border-border">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-2xl font-extrabold">
              {others.length ? `Autres projets · ${video.category}` : "Autres réalisations"}
            </h2>
            <Link href="/realisations" className="btn btn-ghost">
              Voir tout <IconArrow className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {suggestions.map((v) => (
              <WorkCard key={v.id} work={v} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
