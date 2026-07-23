import Image from "next/image";
import { clientLogos } from "@/lib/content";

export default function Clients() {
  return (
    <div className="py-14 md:py-20 border-y border-border bg-surface/60">
      <div className="container-x">
        <p className="text-center text-sm text-muted-2 uppercase tracking-[0.25em] mb-12">
          Plus de 40 marques nous font confiance
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-10 md:gap-x-16 md:gap-y-12">
          {clientLogos.map((c) => (
            <div
              key={c.name}
              title={c.name}
              className="relative h-16 w-36 md:h-20 md:w-44 opacity-90 hover:opacity-100 hover:scale-105 transition duration-300"
            >
              <Image
                src={c.src}
                alt={c.name}
                fill
                sizes="(max-width:768px) 128px, 176px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
