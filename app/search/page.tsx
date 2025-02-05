"use client"

import { Suspense } from "react"
import { SearchProducts } from "@/app/components/SearchProducts"
import { Spinner } from "@/app/components/Spinner"

export default function Search() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Search</h1>
      <Suspense fallback={<Spinner />}>
        <SearchProducts />
      </Suspense>
    </div>
  )
}

