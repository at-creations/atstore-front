"use client";

import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionTitle } from "./ui/SectionTitle";
import { useState, useEffect } from "react";
import { API_HOST } from "../constants";

interface BusinessHours {
  day: string;
  openTime: string;
  closeTime: string;
}

interface StoreInfo {
  _id: string;
  email: string;
  phone: string;
  address: string;
  businessHours: BusinessHours[];
}

export function ContactUs() {
  const t = useTranslations("contact");
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStoreInfo() {
      try {
        const response = await fetch(`${API_HOST}/store-info`);

        if (!response.ok) {
          throw new Error("Failed to fetch store information");
        }

        const data = await response.json();
        setStoreInfo(data.data);
      } catch (err) {
        console.error("Error fetching store information:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStoreInfo();
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
      )}
    </section>
  );
}
