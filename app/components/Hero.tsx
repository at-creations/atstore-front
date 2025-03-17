import { useTranslations } from "next-intl";
import { CDN_HOST } from "../constants";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Animated gradient overlay for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 via-transparent to-black/70 z-0"></div>

      {/* Full screen hero image with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src={`${CDN_HOST}/data/hero.jpg`}
            alt="Hero background"
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-1000 scale-110 animate-subtle-zoom"
            style={{ objectFit: "cover" }}
          />

          {/* Semi-transparent overlay with pattern */}
          <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 px-6 md:px-0 flex flex-col items-center max-w-5xl mx-auto">
        <div className="relative">
          {/* Enhanced glow effect for the logo */}
          <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-white/30 to-blue-500/10 rounded-full blur-2xl animate-pulse-slow"></div>

          {/* Main logo with enhanced animation */}
          <div className="relative h-36 sm:h-52 md:h-64">
            <Image
              src={`${CDN_HOST}/data/white_long_shadow.png`}
              alt="Company logo"
              width={1200}
              height={435}
              priority
              className="h-full w-auto animate-fadeIn animate-float"
            />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-white text-lg md:text-xl mt-8 mb-10 text-center font-light drop-shadow-md tracking-wide max-w-2xl opacity-90 animate-fadeIn animate-delay-300">
          {t("tagline")}
        </p>

        {/* CTA Button */}
        <Link href="/products" className="group">
          <div className="bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 rounded-full px-8 py-4 text-white flex items-center gap-2 transition-all duration-300 animate-fadeIn animate-delay-500 shadow-xl hover:shadow-blue-500/20">
            <span className="font-medium">{t("exploreButton")}</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
    </section>
  );
}
