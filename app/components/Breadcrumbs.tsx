// frontend/src/components/component/Breadcrumbs.tsx
import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  path: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path }) => {
  return (
    <nav className="text-sm mb-4">
      <ol className="list-reset flex">
        {path.map((item, index) => {
          const isLast = index === path.length - 1;
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && <FaChevronRight className="mx-2" />}
              {isLast ? (
                <span className="text-gray-500">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-blue-500 hover:underline">{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;