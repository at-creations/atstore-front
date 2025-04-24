"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { ProductDetails } from "@/app/components/ProductDetails";
import { fetchProductDetails, increaseProductViews } from "@/app/utils/api";
import type { Product } from "@/app/types/api";
import { slugify } from "@/app/utils/slugify";
import { useLocale } from "next-intl";
import { Spinner } from "@/app/components/Spinner";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSlugChecking, setIsSlugChecking] = useState(true);

  const locale = useLocale();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      setIsSlugChecking(true);

      try {
        const fetchedProduct = await fetchProductDetails(productId);
        setProduct(fetchedProduct);

        // Check if the slug in the URL matches the product's actual slug
        const actualSlug = slugify(fetchedProduct.name);

        if (slug !== actualSlug) {
          // If slug doesn't match, show 404
          notFound();
        } else {
          // Only track views when slug is correct
          increaseProductViews(productId);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching product details"
        );
      } finally {
        setIsLoading(false);
        setIsSlugChecking(false);
      }
    }

    loadProduct();
  }, [productId, slug]);

  // Show spinner while loading or checking slug
  if (isLoading || isSlugChecking) {
    return (
      <div className="container mx-auto py-20 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  // Show 404 for errors or missing product
  if (error || !product) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <ProductDetails product={product} locale={locale} />
    </div>
  );
}
