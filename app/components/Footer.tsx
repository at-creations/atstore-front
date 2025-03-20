"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchStoreInfo } from "../utils/api";
import type { StoreInfo } from "../types/api";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function loadStoreInfo() {
      try {
        const data = await fetchStoreInfo();
        setStoreInfo(data);
      } catch (err) {
        console.error("Error fetching store information:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoreInfo();
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
          {/* Company Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://cdn2.atcreations.ca/data/blue_square.png"
                alt="AT Creations Logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                AT Creations
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 md:max-w-72 text-justify text-sm">
              {t("description")}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
              {t("contactUs")}
            </h3>
            {isLoading ? (
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                <span>{t("loading")}</span>
              </div>
            ) : error ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("contactLoadError")}
              </p>
            ) : (
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin
                    size={18}
                    className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    {storeInfo?.address && storeInfo.address.trim() !== ""
                      ? storeInfo.address
                      : t("toBeUpdated")}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone
                    size={18}
                    className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                  />
                  <a
                    href={`tel:${storeInfo?.phone || ""}`}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {storeInfo?.phone && storeInfo.phone.trim() !== ""
                      ? storeInfo.phone
                      : t("toBeUpdated")}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail
                    size={18}
                    className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                  />
                  <a
                    href={`mailto:${storeInfo?.email || "info@atcreations.ca"}`}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {storeInfo?.email && storeInfo.email.trim() !== ""
                      ? storeInfo.email
                      : "info@atcreations.ca"}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} AT Creations. {t("allRightsReserved")}
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors text-sm"
                >
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
