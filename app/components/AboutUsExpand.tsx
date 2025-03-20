import { useTranslations } from "next-intl";
import Image from "next/image";
import { CDN_HOST } from "../constants";

export function AboutUsExpand() {
  const t = useTranslations("aboutExpand");

  return (
    <section className="px-4 sm:px-6 md:px-10 animate-fadeIn">
      <div className="container max-w-6xl mx-auto">
        {/* Main content with image and text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content - takes 7/12 width on desktop */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-6 relative text-justify">
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {t("title")}
              </h2>
              {/* Decorative element */}
              <div className="absolute -left-6 top-12 w-1 h-24 bg-blue-400 rounded-full hidden lg:block"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("paragraph1")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("paragraph2")}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("paragraph3")}
              </p>

              {/* Optional quote or highlight */}
              <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
                {t("quote")}
              </blockquote>
            </div>
          </div>

          {/* Image - takes 5/12 width on desktop */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative">
              {/* Main image with decorative elements */}
              <div className="relative z-[6] rounded-[8px] overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
                {/* Mobile image */}
                <div className="lg:hidden">
                  <Image
                    src={`${CDN_HOST}/data/about_row.jpg`}
                    alt={t("imageAlt")}
                    width={1276}
                    height={956}
                    className="w-full h-auto object-cover rounded-lg"
                    priority={true}
                  />
                </div>

                {/* Desktop image */}
                <div className="hidden lg:block">
                  <Image
                    src={`${CDN_HOST}/data/about_col.jpg`}
                    alt={t("imageAlt")}
                    width={765}
                    height={956}
                    className="w-full h-auto aspect-[4/5] object-cover rounded-[8px]"
                    priority={true}
                  />
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-[8px] z-[5]"></div>

              {/* Optional floating badge or highlight */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg z-[7] hidden lg:block">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {t("established")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional content sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 text-justify">
          {/* Journey section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                {t("journeyTitle")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t("journeyText")}
              </p>
            </div>

            <div className="rounded-lg overflow-hidden mt-auto">
              <Image
                src={`${CDN_HOST}/data/pottery.jpg`}
                alt={t("craftsImageAlt")}
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Craftsmen section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col text-justify">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                {t("craftsmenTitle")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t("craftsmenText")}
              </p>
            </div>

            <div className="rounded-lg overflow-hidden mt-auto">
              <Image
                src={`${CDN_HOST}/data/wood-craft.jpg`}
                alt={t("craftsmanImageAlt")}
                width={600}
                height={400}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Core values section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/80 rounded-2xl p-8 shadow-md text-justify">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            {t("valuesTitle")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                {t("uniquenessTitle")}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t("uniquenessText")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                {t("qualityTitle")}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t("qualityText")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                {t("connectionTitle")}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t("connectionText")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                {t("creativityTitle")}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t("creativityText")}
              </p>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-16 text-justify">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            {t("visitTitle")}
          </h3>

          <ul className="max-w-4xl mx-auto space-y-4 text-left">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {t("visitPoint1")}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {t("visitPoint2")}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {t("visitPoint3")}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                {t("visitPoint4")}
              </span>
            </li>
          </ul>

          <p className="mt-8 text-gray-700 dark:text-gray-300 italic">
            {t("closingMessage")}
          </p>
        </div>
      </div>
    </section>
  );
}
