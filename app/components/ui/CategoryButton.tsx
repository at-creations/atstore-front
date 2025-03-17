import React from "react";

interface CategoryButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function CategoryButton({
  active = false,
  onClick,
  children,
  icon,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center transition-all duration-200 px-5 py-2.5 
        rounded-[5px] font-medium text-sm
        ${
          active
            ? "bg-blue-500 text-white shadow-md shadow-blue-300/30 dark:shadow-blue-900/20 hover:bg-blue-600"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/70"
        }
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {active && (
        <span className="ml-2 flex h-2 w-2 rounded-full bg-white dark:bg-blue-200"></span>
      )}
    </button>
  );
}
