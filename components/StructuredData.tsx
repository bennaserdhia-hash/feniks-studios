import { ORGANIZATION_ID, SITE_URL, absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/content";

export default function StructuredData({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationData() {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: site.name,
        url: SITE_URL,
        logo: absoluteUrl("/brand/logo.png"),
        email: site.email,
        foundingDate: "2014",
        sameAs: site.socials.map((s) => s.href),
      }}
    />
  );
}

export function BreadcrumbData({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
