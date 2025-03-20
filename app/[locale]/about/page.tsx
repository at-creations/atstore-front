"use client";

import { Suspense } from "react";
import Image from "next/image";
import { Spinner } from "@/app/components/Spinner";
import { AboutUsExpand } from "@/app/components/AboutUsExpand";
import { CDN_HOST } from "@/app/constants";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20 space-y-12">
      <Image
        src={`${CDN_HOST}/data/blue_nav_logo.png`}
        alt="Logo"
        width={450}
        height={150}
        className="w-auto mx-auto h-20"
      />
      <Suspense fallback={<Spinner />}>
        <AboutUsExpand />
      </Suspense>
    </div>
  );
}
