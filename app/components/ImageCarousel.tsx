"use client"

import React, { useState } from "react"
import Image from "next/image"
import Slider from "react-slick"
import { Button } from "./ui/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface ImageCarouselProps {
  images: string[]
  productName: string
}

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sliderRef = React.useRef<Slider>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev()
    }
  }

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext()
    }
  }

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index)
    }
  }

  const imagesToShow = images && images.length > 0 ? images : ["https://placehold.co/1200x900?text=No+Image"]

  return (
    <div>
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {imagesToShow.map((image, index) => (
            <div key={index} className="relative h-96" onClick={() => setIsLightboxOpen(true)}>
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg cursor-pointer"
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </div>
          ))}
        </Slider>
        <Button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-5 bg-black bg-opacity-30 hover:bg-opacity-50"
          onClick={goToPrev}
          variant="secondary"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-5 bg-black bg-opacity-30 hover:bg-opacity-50"
          onClick={goToNext}
          variant="secondary"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      <div className="mt-4 flex justify-center space-x-2 overflow-x-auto">
        {imagesToShow.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-16 h-16 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              currentSlide === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </button>
        ))}
      </div>
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={imagesToShow.map((image) => ({ src: image }))}
          index={currentSlide}
        />
      )}
    </div>
  )
}

