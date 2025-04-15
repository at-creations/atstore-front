"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ItemCard } from "./ItemCard";
import { CategoryButton } from "./ui/CategoryButton";
import Pagination from "./Pagination";
import { fetchCategories, fetchProductsByCategory } from "../utils/api";
import type { Category, Product } from "../types/api";
import { SkeletonCard } from "./SkeletonCard";
import { slugify } from "../utils/slugify";
import { DEFAULT_PAGE_SIZE, CDN_HOST } from "@/app/constants";
import { useLocale, useTranslations } from "next-intl";
import { Filter, Grid3x3, Loader2, Globe, BookOpen } from "lucide-react";

export function ProductList() {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialCategorySlug = searchParams.get("category") || "all";
  const [selectedCategorySlug, setSelectedCategorySlug] =
    useState(initialCategorySlug);
  const [selectedCategoryDetails, setSelectedCategoryDetails] =
    useState<Category | null>(null);
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

        // Set selected category details
        if (selectedCategorySlug !== "all") {
          const categoryDetails = fetchedCategories.find(
            (cat) => cat.slug === selectedCategorySlug
          );
          setSelectedCategoryDetails(categoryDetails || null);
        } else {
          setSelectedCategoryDetails(null);
        }
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
    // Update selected category details when category changes
    if (selectedCategorySlug !== "all" && categories.length > 0) {
      const categoryDetails = categories.find(
        (cat) => cat.slug === selectedCategorySlug
      );
      setSelectedCategoryDetails(categoryDetails || null);
    } else {
      setSelectedCategoryDetails(null);
    }
  }, [selectedCategorySlug, categories]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const fetchedProductsResponse = await fetchProductsByCategory(
          selectedCategorySlug,
          itemsPerPage,
          offset
        );
        setProducts(fetchedProductsResponse.data);
        if (fetchedProductsResponse.metadata) {
          setTotalPages(fetchedProductsResponse.metadata.totalPages);
          setTotalResults(fetchedProductsResponse.metadata.totalCount);
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
  }, [selectedCategorySlug, currentPage, itemsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.pushState({}, "", url.toString());
    setCurrentPage(page);
  };

  const handleCategoryChange = (categorySlug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("category", categorySlug);
    url.searchParams.set("page", "1");
    window.history.pushState({}, "", url.toString());
    setSelectedCategorySlug(categorySlug);
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
      {/* Filter section */}
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
                active={selectedCategorySlug === "all"}
                onClick={() => handleCategoryChange("all")}
                icon={<Globe className="h-4 w-4" />}
              >
                {t("all")}
              </CategoryButton>

              {categories.map((category) => (
                <CategoryButton
                  key={category._id}
                  active={selectedCategorySlug === category.slug}
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {locale === "vi" && category.nameVI
                    ? category.nameVI
                    : category.name}
                </CategoryButton>
              ))}
            </>
          )}
        </div>

        {/* Category description section - only show when a specific category is selected */}
        {selectedCategoryDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Category thumbnail */}
              <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                {selectedCategoryDetails.thumbnail ? (
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={`${CDN_HOST}/${selectedCategoryDetails.thumbnail}`}
                      alt={
                        locale === "vi" && selectedCategoryDetails.nameVI
                          ? selectedCategoryDetails.nameVI
                          : selectedCategoryDetails.name
                      }
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 aspect-square rounded-lg shadow-md" />
                )}
              </div>

              {/* Category details */}
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {locale === "vi" && selectedCategoryDetails.nameVI
                      ? selectedCategoryDetails.nameVI
                      : selectedCategoryDetails.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {locale === "vi" && selectedCategoryDetails.descriptionVI
                    ? selectedCategoryDetails.descriptionVI
                    : selectedCategoryDetails.description || t("noDescription")}
                </p>
              </div>
            </div>
          </div>
        )}
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

      {/* Product grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="col-span-full py-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">{t("noProducts")}</p>
          <p>{t("tryOtherCategories")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 stagger-animation">
          {products.map((product) => (
            <ItemCard
              key={product._id}
              product={product}
              slug={slugify(product.name)}
              locale={locale}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
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
