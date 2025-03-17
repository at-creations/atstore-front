import Head from "next/head";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import "@/app/globals.css";
import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for couldn't be found.",
};

const Custom404 = () => {
  const t = useTranslations("404Page");

  return (
    <div className="w-screen h-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8f8f8] px-4 py-16">
      <div className="w-full max-w-4xl">
        {/* Top section with logo and blue accent */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 blur-lg"></div>
            <Image
              src="https://cdn2.atcreations.ca/data/blue_square.png"
              alt="AT Creations Logo"
              width={120}
              height={120}
              className="relative z-10 w-24 h-24"
            />
          </div>
        </div>

        {/* Blue accent line */}
        <div className="flex justify-center mb-8">
          <div className="h-1 w-24 bg-gradient-to-r from-[#0071bc]/30 via-[#0071bc] to-[#0071bc]/30 rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-bold mb-3 text-[#0071bc]">404</h1>
          <h2 className="text-3xl font-semibold mb-4 text-[#0071bc]">
            {t("message1")}
          </h2>
          <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
            {t("message2")}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center px-6 py-3 bg-[#0071bc] text-white rounded-[5px] hover:bg-[#005a9e] transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M14.6771 6.76403L8.47119 1.05463C8.26944 0.86902 8.00377 0.768571 7.72969 0.774278C7.45561 0.779986 7.19434 0.891407 7.0005 1.08525L1.29291 6.79288L1 7.08575V15.5H6.5V10.25H9.5V15.5H15V7.06116L14.6771 6.76403Z"
                fill="currentColor"
              />
            </svg>
            {t("home")}
          </Link>
          <Link
            href="/products"
            className="flex items-center px-6 py-3 bg-white text-[#0071bc] border-2 border-[#0071bc] rounded-[5px] hover:bg-gray-50 transition-all"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M5 3.00122V4.00122H14.5V5.98075L13.3906 9.50122H4.68538L3.43537 0.5H0.5V1.5H2.56463L3.81463 10.5012H14.124L15.5 6.13456V3.00122H5Z"
                fill="currentColor"
              />
              <path
                d="M5.53076 11.5109C5.00051 11.5115 4.49216 11.7224 4.11721 12.0973C3.74227 12.4723 3.53137 12.9806 3.53076 13.5109C3.53076 14.0413 3.74148 14.55 4.11655 14.9251C4.49162 15.3002 5.00033 15.5109 5.53076 15.5109C6.06119 15.5109 6.5699 15.3002 6.94497 14.9251C7.32004 14.55 7.53076 14.0413 7.53076 13.5109C7.53016 12.9806 7.31926 12.4723 6.94431 12.0973C6.56937 11.7224 6.06101 11.5115 5.53076 11.5109Z"
                fill="currentColor"
              />
              <path
                d="M12.5309 11.5109C12.0006 11.5115 11.4923 11.7224 11.1173 12.0973C10.7424 12.4723 10.5315 12.9806 10.5309 13.5109C10.5309 14.0413 10.7416 14.55 11.1167 14.9251C11.4917 15.3002 12.0005 15.5109 12.5309 15.5109C13.0613 15.5109 13.57 15.3002 13.9451 14.9251C14.3202 14.55 14.5309 14.0413 14.5309 13.5109C14.5303 12.9806 14.3194 12.4723 13.9444 12.0973C13.5695 11.7224 13.0611 11.5115 12.5309 11.5109Z"
                fill="currentColor"
              />
            </svg>
            {t("products")}
          </Link>
        </div>

        {/* Decorative blue wavy pattern */}
        <div className="mt-16 h-16 w-full opacity-10">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 0L48 8.96551C96 17.931 192 35.8621 288 48C384 60.1379 480 66.4828 576 57.931C672 49.3793 768 26.0345 864 22.0689C960 18.1034 1056 33.5172 1152 44.1379C1248 54.7586 1344 60.6207 1392 63.5517L1440 66.4828V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
              fill="#0071bc"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
