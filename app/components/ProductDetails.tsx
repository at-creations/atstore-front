import { Card } from "./ui/Card";
import { ImageCarousel } from "./ImageCarousel";
import type { Product } from "../types/api";
import { CDN_HOST } from "../constants";
import { Link } from "@/i18n/navigation";

interface ProductDetailsProps {
  product: Product;
  locale?: string;
}

export function ProductDetails({
  product,
  locale = "en",
}: ProductDetailsProps) {
  const imagesWithCDN = product.images.map((image) => `${CDN_HOST}/${image}`);

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full max-w-2xl mx-auto">
          <ImageCarousel
            images={imagesWithCDN}
            productName={
              locale === "vi" && product.name_vi
                ? product.name_vi
                : product.name
            }
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {locale === "vi" && product.name_vi
              ? product.name_vi
              : product.name}
          </h1>
          {product.price > 0 && (
            <p className="text-xl text-blue-600 dark:text-blue-400 font-bold mb-4">
              ${product.price}
            </p>
          )}
          <p className="text-gray-700 dark:text-gray-200 mb-6">
            {locale === "vi" && product.description_vi
              ? product.description_vi
              : product.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {product.categories?.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                passHref
                className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              >
                {category.name_vi && locale === "vi"
                  ? category.name_vi
                  : category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
