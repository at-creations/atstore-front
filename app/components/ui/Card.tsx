import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className || ""}`}
    >
      {children}
    </div>
  )
}

