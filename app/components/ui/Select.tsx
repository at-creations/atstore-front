import type React from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, id, options, className, ...props }: SelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 ${className || ""}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

