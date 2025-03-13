"use client";

import { Suspense } from "react";
import { Spinner } from "@/app/components/Spinner";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Spinner />}>
        {children}
      </Suspense>
    </div>
  );
}