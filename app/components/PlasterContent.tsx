"use client";

import { useTranslations } from "next-intl";
import { Brush, Users, Gift, Heart } from "lucide-react";
import { CDN_HOST } from "../constants";
import { ImageCarousel } from "./ImageCarousel";
import { SectionTitle } from "./ui/SectionTitle";

// Workshop images for the carousel
const workshopImages = [
  `${CDN_HOST}/data/workshop-space.jpg`,
  `${CDN_HOST}/data/plaster-models.jpg`,
  `${CDN_HOST}/data/finished-works.jpg`,
  `${CDN_HOST}/data/painting-session.jpg`,
];

export function PlasterContent() {
  const t = useTranslations("workshops.plaster-painting");

  // Benefits section data with icons
  const benefits = [
    {
      icon: <Brush className="h-6 w-6 text-blue-500" />,
      title: t("benefits.relax.title"),
      description: t("benefits.relax.description"),
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: t("benefits.connect.title"),
      description: t("benefits.connect.description"),
    },
    {
      icon: <Gift className="h-6 w-6 text-blue-500" />,
      title: t("benefits.create.title"),
      description: t("benefits.create.description"),
    },
    {
      icon: <Heart className="h-6 w-6 text-blue-500" />,
      title: t("benefits.discover.title"),
      description: t("benefits.discover.description"),
    },
  ];

  // What we provide section data
  const offerings = [
    t("offerings.figurines"),
    t("offerings.paints"),
    t("offerings.tools"),
    t("offerings.space"),
    t("offerings.guidance"),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <SectionTitle title={t("title")} />

      {/* Image Gallery Section - Using ImageCarousel component */}
      <div className="mt-10 lg:mt-16">
        <ImageCarousel images={workshopImages} productName={t("title")} />
      </div>

      {/* Welcome message */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {t("welcome.heading")}
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {t("welcome.message")}
        </p>
      </div>

      {/* What we provide section */}
      <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <span className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-md mr-3">
            <Brush className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </span>
          {t("provideHeading")}
        </h2>

        <ul className="space-y-4 pl-4">
          {offerings.map((offering, index) => (
            <li
              key={index}
              className="flex items-start gap-2 animate-slideRight"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-blue-500 font-bold text-xl leading-none">
                •
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {offering}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits section with cards */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          {t("benefitsHeading")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
                  {benefit.icon}
                </div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-14">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final encouragement */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {t("closing")}
        </p>
      </div>
    </div>
  );
}
