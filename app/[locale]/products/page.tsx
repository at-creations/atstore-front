"use client"

import { Suspense } from "react"
import { ProductList } from "@/app/components/ProductList"
import { Spinner } from "@/app/components/Spinner"
import { useTranslations } from "next-intl"

export default function Products() {
  const t = useTranslations("products")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">{t("title")}</h1>
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

