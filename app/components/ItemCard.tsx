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

  return (
    <Link href={`/products/${product._id}/${slug}`} passHref>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full bg-white dark:bg-gray-800 relative border border-gray-100 dark:border-gray-700">
        {/* Image container with overlay effect on hover */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={imageUrl}
            alt={
              locale == "vi" && product.name_vi ? product.name_vi : product.name
            }
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="https://placehold.co/1200x900?text=Loading..."
            className="transition-transform duration-500 group-hover:scale-110"
          />

          {/* Optional featured badge */}
          {product.featured && (
            <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md z-20 shadow-md flex items-center">
              <Star className="h-3 w-3 mr-1" fill="white" />{" "}
              {locale === "vi" ? "Đặc sắc" : "Featured"}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-5 flex-grow space-y-3">
          {/* Categories shown above title */}
          <div className="flex flex-wrap gap-1.5 mb-1">
            {product.categories?.slice(0, 2).map((category) => (
              <div
                key={category.id}
                className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-md dark:bg-blue-900/30 dark:text-blue-300"
              >
                {category.name_vi && locale === "vi"
                  ? category.name_vi
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
            {locale == "vi" && product.name_vi ? product.name_vi : product.name}
          </h3>

          {/* Description with line clamp */}
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
            {locale == "vi" && product.description_vi
              ? product.description_vi
              : product.description}
          </p>

          {/* Bottom section with price and visual cue */}
          <div className="pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-2">
            {product.price > 0 ? (
              <p className="text-blue-600 dark:text-blue-400 font-bold">
                ${product.price.toFixed(2)}
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                {locale === "vi" ? "Liên hệ" : "Contact for price"}
              </p>
            )}

            <div className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
