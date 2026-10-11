import Link from "next/link";
import { BreadcrumbData } from "./StructuredData";
export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <>
      <BreadcrumbData items={items} />
      <nav
        aria-label="Fil d’Ariane"
        className="container-x pt-28 text-sm text-muted"
      >
        <ol className="flex flex-wrap gap-x-3 gap-y-2">
          {items.map((item, i) => (
            <li key={item.path} className="flex gap-3">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link
                  href={item.path}
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
