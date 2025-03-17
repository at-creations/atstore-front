"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ItemCard } from "./ItemCard";
import { SkeletonCard } from "./SkeletonCard";
import Pagination from "./Pagination";
import { fetchCategories, fetchFilteredProducts } from "@/app/utils/api";
import type { Category, Product } from "@/app/types/api";
import { slugify } from "@/app/utils/slugify";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { useLocale, useTranslations } from "next-intl";
import { Search, Filter, SlidersHorizontal, TagsIcon, Grid3X3 } from "lucide-react";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";

interface Option {
  value: string;
  label: string;
}

export function SearchProducts() {
  const t = useTranslations("search");
  const t_error = useTranslations("error");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [sortBy, setSortBy] = useState<Option | null>(null);
  const [priceRange, setPriceRange] = useState<Option | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = DEFAULT_PAGE_SIZE;

  const categoryOptions = [
    { value: "All", label: t("allCategories") },
    ...categories.map((category) => ({
      value: category._id,
      label:
        locale === "vi" && category.name_vi ? category.name_vi : category.name,
    })),
  ];

  const sortByOptions = [
    { value: "created_at-desc", label: t("default") },
    { value: "name-asc", label: t("nameAsc") },
    { value: "name-desc", label: t("nameDesc") },
    { value: "price-asc", label: t("priceAsc") },
    { value: "price-desc", label: t("priceDesc") },
  ];

  const priceRangeOptions = [
    { value: "0-20000", label: t("allPrices") },
    { value: "0-50", label: t("under") + " $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-250", label: "$100 - $250" },
    { value: "250-20000", label: t("above") + " $250" },
  ];

  useEffect(() => {
    setSelectedCategory(
      categoryOptions.find(
        (option) => option.value === searchParams.get("category")
      ) || categoryOptions[0]
    );
    setSortBy(
      sortByOptions.find(
        (option) => option.value === searchParams.get("sort")
      ) || sortByOptions[0]
    );
    setPriceRange(
      priceRangeOptions.find(
        (option) => option.value === searchParams.get("price")
      ) || priceRangeOptions[0]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, categories]);

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
  }, [t_error]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoadingProducts(true);
      try {
        const [priceMin, priceMax] = priceRange?.value
          .split("-")
          .map(Number) || [0, 20000];
        const [sortField, sortOrder] = sortBy?.value.split("-") || [
          "created_at",
          "desc",
        ];

        const updatedSortField =
          sortField === "name" && locale === "vi" ? "name_vi" : sortField;

        const offset = (currentPage - 1) * itemsPerPage;
        const fetchedProductsResponse = await fetchFilteredProducts(
          itemsPerPage,
          offset,
          searchTerm,
          priceMin,
          priceMax,
          updatedSortField,
          sortOrder,
          selectedCategory?.value === "All" ? "" : selectedCategory?.value
        );
        setProducts(fetchedProductsResponse.data);
        if (fetchedProductsResponse.metadata) {
          setTotalPages(
            Math.ceil(fetchedProductsResponse.metadata.total / itemsPerPage)
          );
          setTotalResults(fetchedProductsResponse.metadata.total);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t_error("fetchFailed"));
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();
  }, [searchTerm, selectedCategory, sortBy, priceRange, currentPage, locale, t_error, itemsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const updateSearchParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    router.replace(`${window.location.pathname}?${newSearchParams.toString()}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = categoryOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSelectedCategory(selectedOption);
      setCurrentPage(1);
      updateSearchParams({ category: selectedOption.value, page: "1" });
    }
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = sortByOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setSortBy(selectedOption);
      setCurrentPage(1);
      updateSearchParams({ sort: selectedOption.value, page: "1" });
    }
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = priceRangeOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      setPriceRange(selectedOption);
      setCurrentPage(1);
      updateSearchParams({ price: selectedOption.value, page: "1" });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateSearchParams({ page: page.toString() });
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    updateSearchParams({ search: e.target.value, page: "1" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-indigo-900/30 rounded-2xl p-6 mb-8 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="space-y-6">
          <div className="max-w-3xl mx-auto">
            {/* Search input with enhanced styling */}
            <Input
              type="search"
              id="search"
              placeholder={t("search")}
              value={searchTerm}
              onChange={handleSearchTermChange}
              icon={<Search className="h-5 w-5" />}
              className="shadow-sm"
            />
          </div>

          {/* Filter section with better organization */}
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("filters")}
              </h3>
            </div>

            {/* Filter controls with improved grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <TagsIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {t("category")}
                  </span>
                </div>
                <Select
                  id="category"
                  value={selectedCategory?.value || "All"}
                  onChange={handleCategoryChange}
                  options={categoryOptions}
                  disabled={isLoadingCategories}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <SlidersHorizontal className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {t("sortBy")}
                  </span>
                </div>
                <Select
                  id="sortBy"
                  value={sortBy?.value || "created_at-desc"}
                  onChange={handleSortByChange}
                  options={sortByOptions}
                />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-blue-500 dark:text-blue-400">
                    $
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {t("priceRange")}
                  </span>
                </div>
                <Select
                  id="priceRange"
                  value={priceRange?.value || "0-20000"}
                  onChange={handlePriceRangeChange}
                  options={priceRangeOptions}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Error message with improved styling */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-center max-w-xl mx-auto">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Results summary bar */}
      <div className="flex items-center justify-between mb-6 p-3">
        <div className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {t("products")}
          </h2>
        </div>
        {!isLoadingProducts && products.length > 0 && (
          <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {t("showing")} {products.length} {t("of")} {totalResults}{" "}
              {totalResults === 1 ? t("result") : t("results")}
            </p>
          </div>
        )}
      </div>

      {/* Product grid with staggered animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 stagger-animation">
        {isLoadingProducts ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
              {t("noResults")}
            </p>
            <p className="text-gray-400 dark:text-gray-500">
              {t("tryAdjustingFilters")}
            </p>
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

      {/* Pagination with better positioning */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
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
