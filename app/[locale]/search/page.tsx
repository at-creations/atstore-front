"use client";

import { Suspense } from "react";
import { SearchProducts } from "@/app/components/SearchProducts";
import { Spinner } from "@/app/components/Spinner";
import { useTranslations } from "next-intl";
import { SectionTitle } from "@/app/components/ui/SectionTitle";

export default function Search() {
  const t = useTranslations("search");

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <SectionTitle title={t("title")} />
      <Suspense fallback={<Spinner />}>
        <SearchProducts />
      </Suspense>
    </div>
  );
}
