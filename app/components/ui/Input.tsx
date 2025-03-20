import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  id,
  className = "",
  icon,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 ml-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`w-full py-3 ${
            icon ? "pl-12" : "pl-4"
          } pr-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
            props.type === "search" ? "rounded-full" : "rounded-md"
          } shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
