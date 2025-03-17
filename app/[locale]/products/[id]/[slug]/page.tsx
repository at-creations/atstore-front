"use client";

import { useState, useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { ProductDetails } from "@/app/components/ProductDetails";
import { fetchProductDetails } from "@/app/utils/api";
import type { Product } from "@/app/types/api";
import { slugify } from "@/app/utils/slugify";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { Spinner } from "@/app/components/Spinner";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const slug = params.slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const locale = useLocale();
  const t = useTranslations("common");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function loadProduct() {
      try {
        const fetchedProduct = await fetchProductDetails(productId as string);
        setProduct(fetchedProduct);

        // Check if the slug in the URL matches the product's actual slug
        const actualSlug = slugify(fetchedProduct.name);
        if (slug !== actualSlug) {
          // Redirect to the correct URL with the actual slug
          router.replace(`/products/${productId}/${actualSlug}`);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching product details"
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId, slug, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  const productName =
    locale === "vi" && product.name_vi ? product.name_vi : product.name;

  const breadcrumbsItems = [
    { label: t("home"), href: `/` },
    { label: t("products"), href: `/products` },
    { label: productName, href: `/products/${productId}/${slug}` },
  ];

  return (
    <div className="container mx-auto">
      <ProductDetails product={product} locale={locale} />
    </div>
  );
}
