import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Card } from "./ui/Card";
import { CDN_HOST } from "../constants";
import type { Product } from "../types/api";

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
      <Card className="cursor-pointer transition-transform duration-300 hover:scale-105 flex flex-col h-full">
        <div className="relative h-64">
          <Image
            src={imageUrl}
            alt={
              locale == "vi" && product.name_vi ? product.name_vi : product.name
            }
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="https://placehold.co/1200x900?text=Loading..."
          />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            {locale == "vi" && product.name_vi ? product.name_vi : product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {locale == "vi" && product.description_vi
              ? product.description_vi
              : product.description}
          </p>
          {product.price > 0 && (
            <p className="text-blue-600 dark:text-blue-400 font-bold">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
