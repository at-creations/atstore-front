"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ItemCard } from "./ItemCard";
import { Button } from "./ui/Button";
import Pagination from "./Pagination";
import { fetchCategories, fetchProductsByCategory } from "../utils/api";
import type { Category, Product } from "../types/api";
import { SkeletonCard } from "./SkeletonCard";
import { SkeletonButton } from "./SkeletonButton";
import { slugify } from "../utils/slugify";
import { DEFAULT_PAGE_SIZE } from "@/app/constants";
import { useLocale, useTranslations } from "next-intl";

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
        } else {
          setTotalPages(1);
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
    window.scrollTo(0, 0);
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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          {t("categories")}
        </h2>
        <div className="flex flex-wrap gap-4">
          {isLoadingCategories ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonButton key={index} />
            ))
          ) : (
            <>
              <Button
                variant={selectedCategory === "All" ? "primary" : "secondary"}
                onClick={() => handleCategoryChange("All")}
              >
                {t("all")}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    selectedCategory === category._id ? "primary" : "secondary"
                  }
                  onClick={() => handleCategoryChange(category._id)}
                >
                  {locale === "vi" && category.name_vi
                    ? category.name_vi
                    : category.name}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((product) => (
              <ItemCard
                key={product._id}
                product={product}
                slug={slugify(product.name)}
                locale={locale}
              />
            ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
