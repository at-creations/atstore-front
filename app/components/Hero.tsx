import { Link } from "@/i18n/navigation";
import { Button } from "./ui/Button"
import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations("home")

  return (
    <section className="py-20 text-center animate-fadeIn">
      <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {t("welcome")}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">{t("tagline")}</p>
      <div className="mt-8 animate-pulse">
        <Link href="/products" passHref>
          <Button>{t("exploreButton")}</Button>
        </Link>
      </div>
    </section>
  );
}

