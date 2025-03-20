import React from "react";

interface SectionTitleProps {
  title: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  centered = true,
  className = "",
}: SectionTitleProps) {
  return (
    <div
      className={`relative mb-16 ${centered ? "text-center" : ""} ${className}`}
    >
      <h2 className="inline-block text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <div
        className={`absolute -bottom-3 ${
          centered ? "left-1/2 transform -translate-x-1/2 w-24" : "left-0 w-20"
        } h-1 bg-blue-500 rounded-full`}
      ></div>
    </div>
  );
}
