"use client";

import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import RoutesNavigation from "../../routes"; 

interface ImageCardProps {
  className: string;
  src: StaticImageData;
  alt: string;
  label: string;
  onClickOption: keyof typeof RoutesNavigation;
}
export default function ImageCard({ className, src, alt, label, onClickOption }: ImageCardProps) {
  const router = useRouter();

  const handleImageClick = async () => {
    try {
      const route = RoutesNavigation[onClickOption];
      if (route) {
        await router.push(route); 
      } else {
        throw new Error("Route doesn't exist.");
      }
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  return (
    <div 
      className={`${className} cursor-pointer`}
      onClick={handleImageClick}
    >
      <Image 
        src={src} 
        alt={alt} 
        layout="fill" 
        objectFit="cover" 
        className="transition duration-300 transform group-hover:scale-105 group-hover:brightness-110 rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-center text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
          {label}
        </span>
      </div>
    </div>
  );
}
