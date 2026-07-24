import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/content";
import { IconArrow } from "./Icons";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="reveal card h-full flex flex-col group overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-white/85 backdrop-blur border border-white/40 text-gold-ink font-display font-semibold">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-muted-2 mb-2">{post.readingTime} de lecture</p>
        <h3 className="font-display font-bold text-lg leading-snug mb-3 group-hover:text-gold-ink transition-colors">
          {post.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <span className="inline-flex items-center gap-2 text-sm text-gold-ink mt-5 font-semibold">
          Lire l'article
          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
