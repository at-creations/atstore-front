"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

// Custom button component specifically for the carousel
const CarouselButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`flex items-center justify-center transition-all duration-200 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 active:scale-95"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = React.useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: true,
    autoplay: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const imagesToShow =
    images && images.length > 0
      ? images
      : ["https://placehold.co/1200x900?text=No+Image"];

  return (
    <div className="space-y-4">
      {/* Main carousel with improved styling */}
      <div
        className="relative rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Fullscreen button with enhanced styling */}
        <CarouselButton
          className={`absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 text-white ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Maximize2 className="w-5 h-5" />
        </CarouselButton>

        <Slider ref={sliderRef} {...settings}>
          {imagesToShow.map((image, index) => (
            <div
              key={index}
              className="relative h-[400px] md:h-[500px] lg:h-[550px] cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                fill
                style={{ objectFit: "contain" }}
                className="transition-transform duration-300 group-hover:scale-[1.02]"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNlMmU4ZjAiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZmFmYyIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </Slider>

        {/* Navigation arrows with improved visibility and custom button component */}
        <div
          className={`transition-opacity duration-300 ${
            isHovering || imagesToShow.length <= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <CarouselButton
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-5 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            onClick={goToPrev}
            disabled={imagesToShow.length <= 1}
          >
            <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </CarouselButton>

          <CarouselButton
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-5 rounded-full w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            onClick={goToNext}
            disabled={imagesToShow.length <= 1}
          >
            <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </CarouselButton>
        </div>

        {/* Image counter badge with enhanced styling */}
        {imagesToShow.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
            {currentSlide + 1} <span className="opacity-50 mx-1">/</span>{" "}
            {imagesToShow.length}
          </div>
        )}
      </div>

      {/* Enhanced thumbnails with better styling */}
      {imagesToShow.length > 1 && (
        <div className="flex justify-center py-2 gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {imagesToShow.map((image, index) => (
            <CarouselButton
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden snap-start flex-shrink-0 transition-all duration-300 ${
                currentSlide === index
                  ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 scale-105 z-10"
                  : "ring-1 ring-gray-200 dark:ring-gray-700 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className={`transition-transform duration-300 ${
                  currentSlide === index ? "scale-110" : "scale-100"
                }`}
              />
              {currentSlide === index && (
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/20"></div>
              )}
            </CarouselButton>
          ))}
        </div>
      )}

      {/* Lightbox for fullscreen view */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={imagesToShow.map((image) => ({ src: image }))}
          index={currentSlide}
          carousel={{
            finite: false,
            preload: 2,
            spacing: "20%",
            padding: "16px",
          }}
          animation={{
            fade: 250,
            swipe: 500,
            easing: {
              fade: "ease-in-out",
              swipe: "ease-out",
            },
          }}
        />
      )}
    </div>
  );
}
