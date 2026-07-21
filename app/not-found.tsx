import Link from "next/link";
import { IconArrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center pt-32 pb-16">
      <div className="container-x text-center">
        <p className="font-display text-[7rem] leading-none font-extrabold text-gradient-gold">
          404
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold mt-2">
          Cette page a pris son envol.
        </h1>
        <p className="text-muted mt-4 max-w-md mx-auto">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          Retour à l'accueil <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
