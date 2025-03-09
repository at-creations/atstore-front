"use client";

import { useState, useEffect } from "react";
import { ItemCard } from "./ItemCard";
import TextField from "@mui/material/TextField";
import Select, { SingleValue, StylesConfig } from "react-select";
import { SkeletonCard } from "./SkeletonCard";
import Pagination from "./Pagination";
import { fetchCategories, fetchFilteredProducts } from "@/app/utils/api";
import type { Category, Product } from "@/app/types/api";
import { slugify } from "@/app/utils/slugify";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { useLocale, useTranslations } from "next-intl";

interface Option {
  value: string;
  label: string;
}

const customSelectStyles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    height: "56px", // Match the height of the TextField
    minHeight: "56px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "56px",
    padding: "0 8px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "56px",
  }),
};

export function SearchProducts() {
  const t = useTranslations("search");
  const t_error = useTranslations("error");
  const locale = useLocale();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [sortBy, setSortBy] = useState<Option | null>(null);
  const [priceRange, setPriceRange] = useState<Option | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = DEFAULT_PAGE_SIZE;

  useEffect(() => {
    setSelectedCategory({ value: "All", label: t("allCategories") });
    setSortBy({ value: "created_at-desc", label: t("default") });
    setPriceRange({ value: "0-20000", label: t("allPrices") });
  }, [t]);

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
        const offset = (currentPage - 1) * itemsPerPage;
        const fetchedProductsResponse = await fetchFilteredProducts(
          itemsPerPage,
          offset,
          searchTerm,
          priceMin,
          priceMax,
          sortField,
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
        setError(
          err instanceof Error
            ? err.message
            : t_error("fetchFailed")
        );
      } finally {
        setIsLoadingProducts(false);
      }
    }

    loadProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory, sortBy, priceRange, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleCategoryChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setSelectedCategory(selectedOption);
      setCurrentPage(1); // Reset to first page on filter change
    }
  };

  const handleSortByChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setSortBy(selectedOption);
      setCurrentPage(1); // Reset to first page on filter change
    }
  };

  const handlePriceRangeChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setPriceRange(selectedOption);
      setCurrentPage(1); // Reset to first page on filter change
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-8 p-4 border rounded-lg space-y-4 md:space-y-0 md:flex md:space-x-4">
        <div className="flex-1">
          <TextField
            id="search"
            label={t("search")}
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <Select
            styles={customSelectStyles}
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={[
              { value: "All", label: t("allCategories") },
              ...categories.map((category) => ({
                value: category._id,
                label:
                  locale === "vi" && category.name_vi
                    ? category.name_vi
                    : category.name,
              })),
            ]}
            isLoading={isLoadingCategories}
            isSearchable={false}
          />
        </div>

        <div className="flex-1">
          <Select
            styles={customSelectStyles}
            value={sortBy}
            onChange={handleSortByChange}
            options={[
              { value: "created_at-desc", label: t("default") },
              { value: "name-asc", label: t("nameAsc") },
              { value: "name-desc", label: t("nameDesc") },
              { value: "price-asc", label: t("priceAsc") },
              { value: "price-desc", label: t("priceDesc") },
            ]}
            isSearchable={false}
          />
        </div>

        <div className="flex-1">
          <Select
            styles={customSelectStyles}
            value={priceRange}
            onChange={handlePriceRangeChange}
            options={[
              { value: "0-20000", label: t("allPrices") },
              { value: "0-50", label: t("under") + " $50" },
              { value: "50-100", label: "$50 - $100" },
              { value: "100-250", label: "$100 - $250" },
              { value: "250-20000", label: t("above") + " $250" },
            ]}
            isSearchable={false}
          />
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoadingProducts ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            {t("noResults")}
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

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
