"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/app/types/api";
import { ItemCard } from "@/app/components/ItemCard";
import { fetchFeaturedProducts } from "@/app/utils/api";
import { slugify } from "@/app/utils/slugify";
import { useLocale, useTranslations } from "next-intl";
import { SectionTitle } from "./ui/SectionTitle";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("featuredProducts");
  const locale = useLocale();

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const products = await fetchFeaturedProducts();
        setFeaturedProducts(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 md:px-10">
        <div className="relative container max-w-6xl mx-auto">
          <SectionTitle title={t("title")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-t-xl"></div>
                <div className="p-5">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 md:px-10">
        <SectionTitle title={t("title")} />
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-6 rounded-xl text-center max-w-xl mx-auto">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 relative">

      <div className="relative container max-w-6xl mx-auto">
        <SectionTitle title={t("title")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-animation">
          {featuredProducts.map((product) => (
            <ItemCard
              key={product._id}
              product={product}
              slug={slugify(product.name)}
              locale={locale}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {t("viewAll")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
