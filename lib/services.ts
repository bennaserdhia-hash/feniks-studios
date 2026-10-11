import data from "@/data/services.json";
export const servicePages = data;
export const serviceHref = (icon: string) => {
  const service = servicePages.find((s) => s.icon === icon);
  return service ? `/prestations/${service.slug}` : "/prestations";
};
