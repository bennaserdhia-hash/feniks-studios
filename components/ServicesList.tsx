import { Service } from "@/lib/content";
import { serviceIcons, IconArrow } from "./Icons";

export default function ServicesList({ items }: { items: Service[] }) {
  return (
    <div className="border-t border-border">
      {items.map((service, idx) => {
        const Icon = serviceIcons[service.icon] ?? serviceIcons.play;
        return (
          <div
            key={service.title}
            className="reveal group grid grid-cols-[auto_1fr_auto] md:grid-cols-[5rem_1fr_1.4fr_auto] items-center gap-4 md:gap-8 py-6 md:py-7 border-b border-border transition-colors hover:bg-surface/40 px-2 md:px-4"
          >
            <span className="font-display text-sm font-bold text-gold/50 tabular-nums">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-4">
              <span className="hidden md:grid h-11 w-11 place-items-center rounded-lg bg-gold/10 border border-gold/20 text-gold shrink-0 group-hover:bg-gold group-hover:text-[#1a1508] transition-colors">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display font-bold text-lg md:text-xl leading-tight">
                {service.title}
              </h3>
            </div>
            <p className="hidden md:block text-muted text-sm leading-relaxed">
              {service.description}
            </p>
            <IconArrow className="h-5 w-5 text-muted-2 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
        );
      })}
    </div>
  );
}
