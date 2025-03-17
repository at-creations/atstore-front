"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ItemCard } from "./ItemCard";
import { Button } from "./ui/Button";
import { CategoryButton } from "./ui/CategoryButton";
import Pagination from "./Pagination";
import { fetchCategories, fetchProductsByCategory } from "../utils/api";
import type { Category, Product } from "../types/api";
import { SkeletonCard } from "./SkeletonCard";
import { slugify } from "../utils/slugify";
import { DEFAULT_PAGE_SIZE } from "@/app/constants";
import { useLocale, useTranslations } from "next-intl";
import {
  Filter,
  Grid3x3,
  Loader2,
  Globe,
  TagIcon,
  LayersIcon,
} from "lucide-react";

export function ProductList() {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = DEFAULT_PAGE_SIZE;

  // Locale and translations
  const t = useTranslations("products");
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

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const fetchedProductsResponse =
          selectedCategory === "All"
            ? await fetchProductsByCategory("", itemsPerPage, offset)
            : await fetchProductsByCategory(
                selectedCategory,
                itemsPerPage,
                offset
              );
        setProducts(fetchedProductsResponse.data);
        if (fetchedProductsResponse.metadata) {
          setTotalPages(
            Math.ceil(fetchedProductsResponse.metadata.total / itemsPerPage)
          );
          setTotalResults(fetchedProductsResponse.metadata.total);
        } else {
          setTotalPages(1);
          setTotalResults(fetchedProductsResponse.data.length);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t_error("fetchFailed"));
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, currentPage, itemsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url.toString());
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("category", category);
    url.searchParams.set("page", "1");
    window.history.pushState({}, "", url.toString());
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="py-12 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-center max-w-xl mx-auto shadow-sm border border-red-200 dark:border-red-800/50">
        <p className="text-lg font-medium">{error}</p>
        <p className="mt-2">{t_error("tryAgain")}</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Filter section with improved styling */}
      <div className="mb-10 bg-white dark:bg-gray-800/80 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-5">
          <Filter className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {t("categories")}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {isLoadingCategories ? (
            <div className="w-full flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>{t("loading")}</span>
            </div>
          ) : (
            <>
              <CategoryButton
                active={selectedCategory === "All"}
                onClick={() => handleCategoryChange("All")}
                icon={<Globe className="h-4 w-4" />}
              >
                {t("all")}
              </CategoryButton>

              {categories.map((category) => (
                <CategoryButton
                  key={category._id}
                  active={selectedCategory === category._id}
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {locale === "vi" && category.name_vi
                    ? category.name_vi
                    : category.name}
                </CategoryButton>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Results title and count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Grid3x3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {t("products")}
          </h2>
        </div>
        {!isLoading && products.length > 0 && (
          <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {t("showing")} {products.length} {t("of")} {totalResults}{" "}
              {totalResults === 1 ? t("item") : t("items")}
            </p>
          </div>
        )}
      </div>

      {/* Product grid with improved styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 stagger-animation">
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">{t("noProducts")}</p>
            <p>{t("tryOtherCategories")}</p>
          </div>
        ) : (
          products.map((product) => (
            <ItemCard
              key={product._id}
              product={product}
              slug={slugify(product.name)}
              locale={locale}
            />
          ))
        )}
      </div>

      {/* Pagination with improved styling */}
      {totalPages > 1 && (
        <div className="mt-16">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
