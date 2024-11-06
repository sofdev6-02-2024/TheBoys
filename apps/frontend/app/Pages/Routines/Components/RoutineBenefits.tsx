"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState, useCallback } from "react";

interface CarouselImage {
  src: StaticImageData;
  mobileSrc?: StaticImageData;
  alt: string;
  title: string;
  text: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

export const RoutineBenefits = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const goToSlide = useCallback((index: number) => { 
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    const autoAdvance = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % images.length);
    }, 7000);

    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(autoAdvance);
    };
  }, [images.length]);

  const renderNavButtons = () => (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentIndex === index 
              ? "bg-red-500 w-6" 
              : "bg-white/50 hover:bg-white/80"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );

  const currentImage = images[currentIndex];
  const imageSrc = isMobile && currentImage.mobileSrc 
    ? currentImage.mobileSrc 
    : currentImage.src;

  return (
    <div className={`relative ${isMobile ? "w-screen -mx-4" : "w-full space-y-4"}`}>
      <div className={`relative ${isMobile ? "h-[80vh]" : "h-[404px]"} w-full`}>
        <Image
          src={imageSrc}
          alt={currentImage.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className={`text-white ${isMobile ? "text-2xl" : "text-3xl"} font-bold mb-2`}>
            {currentImage.title}
          </h2>
          <p className={`text-white ${isMobile ? "text-sm" : "text-lg"} max-w-2xl`}>
            {currentImage.text}
          </p>
        </div>

        <button
          onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={() => goToSlide((currentIndex + 1) % images.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white"
          aria-label="Next slide"
        >
          ›
        </button>

        {renderNavButtons()}
      </div>
    </div>
  );
};

export default RoutineBenefits;
