import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card } from "./ui/Card";
import { CDN_HOST } from "../constants";
import type { Product } from "../types/api";
import { ShoppingBag, Star } from "lucide-react";

interface ItemCardProps {
  product: Product;
  slug: string;
  locale?: string;
}

export function ItemCard({ product, slug, locale = "en" }: ItemCardProps) {
  const imageUrl = product.thumbnail
    ? `${CDN_HOST}/${product.thumbnail}`
    : "https://placehold.co/1200x900?text=No%20Image";

  // Calculate discount price if discount is present
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - (product.discount || 0) / 100)
    : product.price;

  return (
    <Link href={`/products/${product._id}/${slug}`} passHref>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full bg-white relative border border-gray-100 rounded-[8px]">
        {/* Image container with overlay effect on hover - 4:3 aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: "75%" }}>
          {" "}
          {/* 3/4 = 75% for 4:3 ratio */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={imageUrl}
            alt={
              locale == "vi" && product.nameVI ? product.nameVI : product.name
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Optional featured badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md z-20 shadow-md flex items-center">
              <Star className="h-3 w-3 mr-1" fill="white" />{" "}
              {locale === "vi" ? "Nổi bật" : "Featured"}
            </div>
          )}
          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-20 shadow-md flex items-center">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content section with flex-grow to push bottom section down */}
        <div className="p-5 flex flex-col h-full">
          <div className="flex-grow space-y-3 mb-4">
            {/* Categories shown above title */}
            <div className="flex flex-wrap gap-1.5 mb-1">
              {product.categories?.slice(0, 2).map((category) => (
                <div
                  key={category._id}
                  className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-md dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {category.nameVI && locale === "vi"
                    ? category.nameVI
                    : category.name}
                </div>
              ))}
              {(product.categories?.length || 0) > 2 && (
                <div className="inline-block text-xs text-gray-400">
                  +{(product.categories?.length || 0) - 2}
                </div>
              )}
            </div>

            {/* Product title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {locale == "vi" && product.nameVI ? product.nameVI : product.name}
            </h3>

            {/* Description with line clamp */}
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
              {locale == "vi" && product.descriptionVI
                ? product.descriptionVI
                : product.description}
            </p>
          </div>

          {/* Bottom section with price and visual cue - always at bottom */}
          <div className="pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-auto">
            {product.price > 0 ? (
              <div>
                {hasDiscount ? (
                  <div className="flex flex-col">
                    <p className="text-blue-600 dark:text-blue-400 font-bold">
                      ${discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-xs line-through">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-blue-600 dark:text-blue-400 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                {locale === "vi" ? "Liên hệ để biết giá" : "Contact for price"}
              </p>
            )}

            <div className="flex items-center">
              {product.stock > 0 ? (
                <div className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </div>
              ) : (
                <div className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                  {locale === "vi" ? "Hết hàng" : "Out of stock"}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
