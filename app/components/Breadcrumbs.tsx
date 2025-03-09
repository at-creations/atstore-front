import { Link } from "@/i18n/navigation";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {

  return (
    <nav className="text-sm mb-4">
      <ul className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link href={item.href} className="text-blue-600 hover:underline">
              {item.label}
            </Link>
            {index < items.length - 1 && <span className="mx-2">&gt;</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
