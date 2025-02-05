"use client"

import { useState, useEffect } from "react"
import { products } from "../data/mockData"
import { ItemCard } from "./ItemCard"
import { Input } from "./ui/Input"
import { Select } from "./ui/Select"
import { fetchCategories } from "../utils/api"
import type { Category } from "../types/api"

export function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories()
        setCategories(fetchedCategories)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching categories")
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "price") {
        return a.price - b.price
      }
      return 0
    })

  if (isLoading) {
    return <div>Loading categories...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          label="Category:"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={[
            { value: "All", label: "All Categories" },
            ...categories.map((category) => ({ value: category.name, label: category.name })),
          ]}
        />

        <Select
          label="Sort by:"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          options={[
            { value: "name", label: "Name" },
            { value: "price", label: "Price" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

