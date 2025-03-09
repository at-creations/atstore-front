import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export function ContactUs() {
  const t = useTranslations("contact")
  
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-slideUp">
      <h2 className="section-title">{t("title")}</h2>
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animation">
        <div className="flex items-center space-x-4">
          <Mail
            className="text-blue-500 dark:text-blue-400 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {t("email")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              info@atcreations.ca
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone
            className="text-blue-500 dark:text-blue-400 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {t("phone")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{t("toBeUpdated")}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin
            className="text-blue-500 dark:text-blue-400 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {t("address")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{t("toBeUpdated")}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Clock
            className="text-blue-500 dark:text-blue-400 flex-shrink-0"
            size={24}
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {t("hours")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{t("toBeUpdated")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

