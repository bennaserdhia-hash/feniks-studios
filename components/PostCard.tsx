import Link from "next/link";
import { Post } from "@/lib/content";
import { IconArrow } from "./Icons";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="reveal card p-7 h-full flex flex-col group">
      <div className="flex items-center gap-3 text-xs mb-4">
        <span className="text-gold uppercase tracking-widest font-display font-semibold">
          {post.category}
        </span>
        <span className="text-muted-2">•</span>
        <span className="text-muted-2">{post.readingTime} de lecture</span>
      </div>
      <h3 className="font-display font-bold text-lg leading-snug mb-3 group-hover:text-gold-light transition-colors">
        {post.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed flex-1">{post.excerpt}</p>
      <span className="inline-flex items-center gap-2 text-sm text-gold mt-5 font-medium">
        Lire l'article
        <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
