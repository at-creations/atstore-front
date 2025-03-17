"use client"

import { Suspense } from "react"
import { ProductList } from "@/app/components/ProductList"
import { Spinner } from "@/app/components/Spinner"
import { useTranslations } from "next-intl"
import { SectionTitle } from "@/app/components/ui/SectionTitle"

export default function Products() {
  const t = useTranslations("products")

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <SectionTitle title={t("title")} />
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

