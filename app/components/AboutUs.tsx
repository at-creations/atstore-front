import { useTranslations } from "next-intl";

export function AboutUs() {
  const t = useTranslations("about");

  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-slideUp">
      <h2 className="section-title">{t("title")}</h2>
      <p className="text-lg text-gray-700 text-justify">{t("paragraph1")}</p>
      <p className="text-lg text-gray-700 text-justify mt-4">{t("paragraph2")}</p>
      <p className="text-lg text-gray-700 text-justify mt-4">
        {t("paragraph3")}
      </p>
    </section>
  );
}
