"use client";

import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./ui/SectionTitle";
import { useState, useEffect } from "react";
import { fetchStoreInfo } from "../utils/api";
import type { StoreInfo } from "../types/api";

export function ContactUs() {
  const t = useTranslations("contact");
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStoreInfo() {
      try {
        const data = await fetchStoreInfo();
        setStoreInfo(data);
      } catch (err) {
        console.error("Error fetching store information:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    loadStoreInfo();
  }, []);

  // Format business hours for display
  const formattedBusinessHours = () => {
    if (
      !storeInfo ||
      !storeInfo.businessHours ||
      storeInfo.businessHours.length === 0
    ) {
      return t("toBeUpdated");
    }

    return (
      <div className="space-y-1">
        {storeInfo.businessHours.map((hours, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-medium">{hours.day}:</span>
            <span>
              {hours.openTime} - {hours.closeTime}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 animate-slideUp">
      <SectionTitle title={t("title")} />

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="max-w-lg mx-auto p-4 text-center bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
          <p>Failed to load contact information. Please try again later.</p>
        </div>
      ) : (
        <>
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
                    {storeInfo?.email && storeInfo.email.trim() !== ""
                      ? storeInfo.email
                      : t("toBeUpdated")}
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
                    {storeInfo?.phone && storeInfo.phone.trim() !== ""
                      ? storeInfo.phone
                      : t("toBeUpdated")}
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
                    {storeInfo?.address && storeInfo.address.trim() !== ""
                      ? storeInfo.address
                      : t("toBeUpdated")}
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
                  <div className="text-gray-600 dark:text-gray-300 mt-1">
                    {formattedBusinessHours()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                {t("findUs")}
              </h3>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.5470469912702!2d-123.1039814231315!3d49.24707637327446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f70bb9e8f9%3A0xc8b9b9778c52af34!2s4305%20Main%20St%2C%20Vancouver%2C%20BC%20V5V%203R1!5e0!3m2!1svi!2sca!4v1742497390477!5m2!1svi!2sca"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="AT Creations Store Location"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.app.goo.gl/NnPqd5rduTpQjG4o9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <span>{t("getDirections")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
