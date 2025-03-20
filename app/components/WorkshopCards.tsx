"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CDN_HOST } from "../constants";
import Image from "next/image";
import { ChevronRight, Clock, Users } from "lucide-react";

interface Workshop {
  id: string;
  imageUrl: string;
  route: string;
  duration?: string;
  capacity?: string;
}

export function WorkshopCards() {
  const t = useTranslations("workshops");

  // For now, only one workshop (plaster painting)
  const workshops: Workshop[] = [
    {
      id: "plaster-painting",
      imageUrl: `${CDN_HOST}/data/workshop-space.jpg`,
      route: "/workshops/plaster-painting",
      duration: "2 hours",
      capacity: "10-15 people",
    },
    // Additional workshops can be added later
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <p className="text-gray-700 dark:text-gray-300 text-lg text-center max-w-3xl mx-auto mb-12">
        {t("introduction")}
      </p>

      <div className="space-y-4">
        {workshops.map((workshop, index) => (
          <div
            key={workshop.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md animate-fadeIn flex flex-col md:flex-row"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Image section - takes full width on mobile, larger portion on wider screens */}
            <div className="relative aspect-video md:aspect-auto md:w-2/5 lg:w-2/5 xl:w-1/3 flex-shrink-0">
              <Image
                src={workshop.imageUrl}
                alt={t(`${workshop.id}.title`)}
                fill
                className="object-cover"
              />
            </div>

            {/* Content section */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between text-justify">
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 dark:text-gray-100 mb-3">
                  {t(`${workshop.id}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-prose">
                  {t(`${workshop.id}.summary`)}
                </p>

                {/* Workshop details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {workshop.duration && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{workshop.duration}</span>
                    </div>
                  )}

                  {workshop.capacity && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{workshop.capacity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to action - only Learn More */}
              <div>
                <Link
                  href={workshop.route}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  {t("learnMore")}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
