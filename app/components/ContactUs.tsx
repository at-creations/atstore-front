import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./ui/SectionTitle";

export function ContactUs() {
  const t = useTranslations("contact");

  return (
    <section className="py-24 px-4 sm:px-6 md:px-10 bg-gradient-to-br from-white via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-800 rounded-xl shadow-lg animate-slideUp">
      <SectionTitle title={t("title")} />

      <div className="mt-12 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Email Contact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-5">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
              <Mail className="text-blue-500 dark:text-blue-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("email")}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1 hover:underline">
                info@atcreations.ca
              </p>
            </div>
          </div>
        </div>

        {/* Phone Contact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-5">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
              <Phone className="text-blue-500 dark:text-blue-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("phone")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("toBeUpdated")}
              </p>
            </div>
          </div>
        </div>

        {/* Address Contact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-5">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
              <MapPin className="text-blue-500 dark:text-blue-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("address")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("toBeUpdated")}
              </p>
            </div>
          </div>
        </div>

        {/* Hours Contact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-5">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
              <Clock className="text-blue-500 dark:text-blue-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("hours")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {t("toBeUpdated")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
