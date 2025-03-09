"use client"

import { useEffect, useState } from "react"
import { Link } from "@/i18n/navigation"
import type { Product } from "@/app/types/api"
import { ItemCard } from "@/app/components/ItemCard"
import { fetchFeaturedProducts } from "@/app/utils/api"
import { slugify } from "@/app/utils/slugify"
import { useLocale, useTranslations } from "next-intl"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const t = useTranslations("featuredProducts")
  const locale = useLocale()

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const products = await fetchFeaturedProducts()
        setFeaturedProducts(products)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20">
        <h2 className="section-title animate-slideUp">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20">
        <h2 className="section-title animate-slideUp">{t("title")}</h2>
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <h2 className="section-title animate-slideUp">{t("title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-animation">
        {featuredProducts.map((product) => (
          <ItemCard
            key={product._id}
            product={product}
            slug={slugify(product.name)}
            locale={locale}
          />
        ))}
      </div>
      <div
        className="text-center mt-8 animate-fadeIn"
        style={{ animationDelay: "0.5s" }}
      >
        <Link href="/products" className="btn btn-primary">
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}

