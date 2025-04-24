"use client"

import { useState, useEffect } from "react";
import { fetchCategories } from "../utils/api";
import { Category } from "../types/api";
import { useTranslations, useLocale } from "next-intl";
import { CDN_HOST } from "@/app/constants";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { SectionTitle } from "./ui/SectionTitle";

export function ExploreCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("categories");
  const t_error = useTranslations("error");
  const locale = useLocale();

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : t_error("fetchFailed"));
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return null if categories failed to load
  if (error) {
    return null;
  }

  return (
    <div className="space-y-8 container mx-auto px-4">
      <div className="text-center">
        <SectionTitle title={t("title")} />
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      {isLoadingCategories ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 max-w-2xl mx-auto gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.slug}`}
              key={category._id}
              className="group relative rounded-[5px] overflow-hidden aspect-square shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {category.thumbnail ? (
                <Image
                  src={`${CDN_HOST}/${category.thumbnail}`}
                  alt={
                    locale === "vi" && category.nameVI
                      ? category.nameVI
                      : category.name
                  }
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" />
              )}

              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-medium text-sm sm:text-base truncate">
                  {locale === "vi" && category.nameVI
                    ? category.nameVI
                    : category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
