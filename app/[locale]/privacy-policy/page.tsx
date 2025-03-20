import { SectionTitle } from "@/app/components/ui/SectionTitle";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AT Creations",
  description: "Privacy policy for AT Creations website and services.",
};

export default function PrivacyPolicy() {
  const t = useTranslations("privacyPolicy");

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
            {t("informationCollection.title")}
          </h2>
          <p className="mb-4">{t("informationCollection.content")}</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{t("informationCollection.items.personal")}</li>
            <li>{t("informationCollection.items.usage")}</li>
            <li>{t("informationCollection.items.cookies")}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("useOfInformation.title")}
          </h2>
          <p className="mb-4">{t("useOfInformation.content")}</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{t("useOfInformation.items.service")}</li>
            <li>{t("useOfInformation.items.improvement")}</li>
            <li>{t("useOfInformation.items.communication")}</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("dataSharing.title")}
          </h2>
          <p className="mb-6">{t("dataSharing.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("dataRetention.title")}
          </h2>
          <p className="mb-6">{t("dataRetention.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("yourRights.title")}
          </h2>
          <p className="mb-6">{t("yourRights.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("securityMeasures.title")}
          </h2>
          <p className="mb-6">{t("securityMeasures.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("changes.title")}
          </h2>
          <p className="mb-6">{t("changes.content")}</p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {t("contact.title")}
          </h2>
          <p className="mb-2">{t("contact.content")}</p>
          <p className="mb-2">
            <strong>Email:</strong> privacy@atcreations.ca
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
