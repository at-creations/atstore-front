"use client"

import { SearchProducts } from "@/app/components/SearchProducts"

export default function Search() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Advanced Search</h1>
      <SearchProducts />
    </div>
  )
}

