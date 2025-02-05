"use client"

import { ProductList } from "@/app/components/ProductList"

export default function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Our Products</h1>
      <ProductList />
    </div>
  )
}

