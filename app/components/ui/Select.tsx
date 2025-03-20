import type React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  options: SelectOption[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  label,
  id,
  className = "",
  options,
  onChange,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          onChange={onChange}
          className={`w-full py-3 px-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-[8px] appearance-none pr-10 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200 ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 dark:text-gray-500">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
