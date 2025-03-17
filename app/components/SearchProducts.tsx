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
import { Search } from "lucide-react";
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
  }, []);

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
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t_error("fetchFailed"));
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();
  }, [searchTerm, selectedCategory, sortBy, priceRange, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="max-w-7xl mx-auto">
      <form onSubmit={handleSearchSubmit}>
        <div className="mb-10 space-y-6">
          {/* Search input using the new Input component */}
          <Input
            type="search"
            id="search"
            placeholder={t("search")}
            value={searchTerm}
            onChange={handleSearchTermChange}
            icon={<Search className="h-5 w-5" />}
          />

          {/* Filter controls using the new Select component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              id="category"
              label={t("category")}
              value={selectedCategory?.value || "All"}
              onChange={handleCategoryChange}
              options={categoryOptions}
              disabled={isLoadingCategories}
            />

            <Select
              id="sortBy"
              label={t("sortBy")}
              value={sortBy?.value || "created_at-desc"}
              onChange={handleSortByChange}
              options={sortByOptions}
            />

            <Select
              id="priceRange"
              label={t("priceRange")}
              value={priceRange?.value || "0-20000"}
              onChange={handlePriceRangeChange}
              options={priceRangeOptions}
            />
          </div>
        </div>
      </form>

      {/* Error message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-500 rounded-md">
          {error}
        </div>
      )}

      {/* Results count */}
      {!isLoadingProducts && (
        <div className="mb-6 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            {products.length > 0
              ? `${t("showing")} ${products.length} ${
                  products.length === 1 ? t("result") : t("results")
                }`
              : ""}
          </p>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoadingProducts ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <p className="text-gray-400 text-lg">{t("noResults")}</p>
            <p className="text-gray-400 mt-2">{t("tryAdjustingFilters")}</p>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
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
