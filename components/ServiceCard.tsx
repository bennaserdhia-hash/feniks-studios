import { Service } from "@/lib/content";
import { serviceIcons } from "./Icons";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon] ?? serviceIcons.play;
  return (
    <div className="reveal card p-7 h-full flex flex-col">
      <div className="h-12 w-12 rounded-xl grid place-items-center bg-gold/10 border border-gold/20 text-gold mb-5">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display font-bold text-lg leading-snug mb-2">{service.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}
