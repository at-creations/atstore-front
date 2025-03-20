import { useTranslations } from "next-intl";
import Image from "next/image";
import { CDN_HOST } from "../constants";
import { SectionTitle } from "./ui/SectionTitle";
import { ArrowButton } from "./ui/ArrowButton";

export function AboutUs() {
  const t = useTranslations("about");

  return (
    <section className="px-4 sm:px-6 md:px-10 animate-fadeIn">
      <div className="container max-w-6xl mx-auto">
        {/* Using the new SectionTitle component */}
        <SectionTitle title={t("title")} />

        {/* Main content with image and text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content - takes 7/12 width on desktop */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="space-y-6 relative text-justify">
              {/* Decorative element */}
              <div className="absolute -left-6 top-0 w-1 h-24 bg-blue-400 rounded-full hidden lg:block"></div>

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

        <div className="flex justify-center mt-16">
          <ArrowButton
            href="/about"
            text={t("moreAboutUs")}
            variant="primary"
            size="md"
            arrowPosition="right"
          />
        </div>
      </div>
    </section>
  );
}
