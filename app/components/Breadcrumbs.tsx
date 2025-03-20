import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
  className?: string;
}

export default function Breadcrumbs({
  items,
  className = "",
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm mb-4 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {/* Home link (optional) */}
        {!items.some((item) => item.href === "/") && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Home size={14} className="mr-1" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight
              size={14}
              className="mx-2 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
            />
          </li>
        )}

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item.label}
                </Link>
                <ChevronRight
                  size={14}
                  className="mx-2 text-gray-400 dark:text-gray-600"
                  aria-hidden="true"
                />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
