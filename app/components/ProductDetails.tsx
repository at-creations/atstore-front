import { Card } from "./ui/Card";
import { ImageCarousel } from "./ImageCarousel";
import type { Product } from "../types/api";
import { CDN_HOST } from "../constants";
import { Link } from "@/i18n/navigation";
import { Tag, Check, Star, Calendar, Percent } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface ProductDetailsProps {
  product: Product;
  locale?: string;
}

export function ProductDetails({
  product,
  locale = "en",
}: ProductDetailsProps) {
  const imagesWithCDN = product.images.map((image) => `${CDN_HOST}/${image}`);
  const productName =
    locale === "vi" && product.name_vi ? product.name_vi : product.name;

  // Calculate discounted price if discount is provided
  const hasDiscount =
    product.discount && product.discount > 0 && product.discount < 100;
  const discountedPrice = hasDiscount
    ? parseFloat(
        (product.price * (1 - (product.discount ?? 0) / 100)).toFixed(2)
      )
    : null;

  // Determine if product is new (created within the last 30 days)
  const isProductNew = () => {
    if (!product.created_at) return false;

    const creationDate = new Date(product.created_at);
    const today = new Date();
    const differenceInTime = today.getTime() - creationDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays <= 30;
  };

  const isNew = isProductNew();

  // Breadcrumb items
  const breadcrumbItems = [
    { label: locale === "vi" ? "Trang chủ" : "Home", href: "/" },
    { label: locale === "vi" ? "Sản phẩm" : "Products", href: "/products" },
    { label: productName, href: `/products/${product._id}` },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={breadcrumbItems} />

      <Card className="overflow-hidden border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {/* Left column - Product Images */}
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-800/50 dark:to-gray-900 p-4 lg:p-6 rounded-l-lg">
            <div className="max-w-xl mx-auto">
              <ImageCarousel images={imagesWithCDN} productName={productName} />
            </div>
          </div>

          {/* Right column - Product Info */}
          <div className="p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Product badges */}
              <div className="flex flex-wrap gap-2">
                {product.featured && (
                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-md dark:bg-yellow-900/30 dark:text-yellow-300">
                    <Star className="w-3.5 h-3.5 mr-1" />{" "}
                    {locale === "vi" ? "Nổi bật" : "Featured"}
                  </span>
                )}
                {isNew && (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-md dark:bg-green-900/30 dark:text-green-300">
                    <Check className="w-3.5 h-3.5 mr-1" />{" "}
                    {locale === "vi" ? "Mới" : "New"}
                  </span>
                )}
                {hasDiscount && (
                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-md dark:bg-red-900/30 dark:text-red-300">
                    <Percent className="w-3.5 h-3.5 mr-1" />{" "}
                    {locale === "vi" ? "Giảm" : "Sale"} {product.discount}%
                  </span>
                )}
              </div>

              {/* Product title */}
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
                {productName}
              </h1>

              {/* Price section - Enhanced with discount calculation */}
              <div className="flex items-center gap-3">
                {product.price > 0 ? (
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                            ${discountedPrice}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="mt-1 text-sm text-green-600 dark:text-green-400 font-medium">
                        {locale === "vi" ? "Tiết kiệm" : "You save"}: $
                        {(product.price - (discountedPrice ?? 0)).toFixed(2)} (
                        {product.discount}%)
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-lg italic text-gray-500">
                    {locale === "vi"
                      ? "Liên hệ để biết giá"
                      : "Contact for pricing"}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="prose prose-blue dark:prose-invert prose-sm max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {locale === "vi" && product.description_vi
                    ? product.description_vi
                    : product.description}
                </p>
              </div>

              {/* Categories */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === "vi" ? "Danh mục" : "Categories"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.categories?.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      passHref
                      className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-100 transition-colors dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-800/40"
                    >
                      {category.name_vi && locale === "vi"
                        ? category.name_vi
                        : category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional product info */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              {product.created_at && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(product.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
              {product._id && (
                <div>
                  <span className="font-medium">
                    {locale === "vi" ? "Mã SP" : "SKU"}:
                  </span>{" "}
                  {product._id}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
