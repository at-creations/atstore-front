"use client"

import { Suspense } from "react"
import { ProductList } from "@/app/components/ProductList"
import { Spinner } from "@/app/components/Spinner"

export default function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Our Products</h1>
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

