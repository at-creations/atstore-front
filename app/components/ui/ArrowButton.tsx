import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ArrowButtonProps {
  href: string;
  className?: string;
  text: string;
  icon?: React.ReactNode;
  arrowPosition?: "right" | "left";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

export function ArrowButton({
  href,
  className = "",
  text,
  icon,
  arrowPosition = "right",
  size = "md",
  variant = "primary",
  onClick,
}: ArrowButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md hover:shadow-lg",
    secondary:
      "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 shadow-sm hover:shadow",
    outline:
      "text-blue-600 dark:text-blue-400 bg-transparent border border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-sm hover:shadow",
  };

  // Combined classes for the button
  const buttonClasses = `
    inline-flex items-center font-medium rounded-full 
    transition-all duration-300
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${className}
  `;

  // Using the Link component from Next.js Internationalization
  return (
    <Link href={href} className={buttonClasses} onClick={onClick}>
      {arrowPosition === "left" && (
        <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
      )}

      {icon && arrowPosition === "left" ? (
        <span className="ml-2">{icon}</span>
      ) : icon && arrowPosition === "right" ? (
        <span className="mr-2">{icon}</span>
      ) : null}

      {text}

      {arrowPosition === "right" && (
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
      )}
    </Link>
  );
}
