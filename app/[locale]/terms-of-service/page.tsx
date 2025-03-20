import { SectionTitle } from "@/app/components/ui/SectionTitle";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AT Creations",
  description:
    "Terms and conditions for using AT Creations website and services.",
};

export default function TermsOfService() {
  const t = useTranslations("termsOfService");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 animate-fadeIn">
      <SectionTitle title={t("title")} />

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 lg:p-10 mt-8 border border-gray-100 dark:border-gray-700">
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("lastUpdated")}: March 15, 2025
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("introduction.title")}
          </h2>
          <p className="mb-6">{t("introduction.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("useOfService.title")}
          </h2>
          <p className="mb-6">{t("useOfService.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("accountResponsibilities.title")}
          </h2>
          <p className="mb-6">{t("accountResponsibilities.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("intellectualProperty.title")}
          </h2>
          <p className="mb-6">{t("intellectualProperty.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("userContent.title")}
          </h2>
          <p className="mb-6">{t("userContent.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("productPurchases.title")}
          </h2>
          <p className="mb-6">{t("productPurchases.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("returns.title")}
          </h2>
          <p className="mb-6">{t("returns.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("disclaimers.title")}
          </h2>
          <p className="mb-6">{t("disclaimers.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("limitation.title")}
          </h2>
          <p className="mb-6">{t("limitation.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("termination.title")}
          </h2>
          <p className="mb-6">{t("termination.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("governingLaw.title")}
          </h2>
          <p className="mb-6">{t("governingLaw.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("changes.title")}
          </h2>
          <p className="mb-6">{t("changes.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("contact.title")}
          </h2>
          <p className="mb-2">{t("contact.content")}</p>
          <p className="mb-2">
            <strong>Email:</strong> legal@atcreations.ca
          </p>
          <p className="mb-6">
						<strong>{t("contact.address")}:</strong>
						To be updated
          </p>
        </div>
      </div>
    </div>
  );
}
