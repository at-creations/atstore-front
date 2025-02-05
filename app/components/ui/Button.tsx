import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  children: React.ReactNode
}

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  const baseClasses = "px-6 py-2 rounded-full text-white font-medium transition-all duration-300"
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary-light to-blue-400 hover:from-blue-500 hover:to-blue-600 dark:from-primary-dark dark:to-blue-500 dark:hover:from-blue-600 dark:hover:to-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className || ""}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

