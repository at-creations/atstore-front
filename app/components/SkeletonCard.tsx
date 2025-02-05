import React from "react"

export function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col h-full rounded-lg bg-gray-200 dark:bg-gray-700">
      <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded-t-lg"></div>
      <div className="p-4 flex-grow">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
      </div>
    </div>
  )
}