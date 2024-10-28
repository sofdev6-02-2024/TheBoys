// Icon.tsx
import Image, { StaticImageData } from "next/image";

interface IconProps {
  src: StaticImageData;
  alt: string;
  isActive?: boolean;
  onClick: () => void;
}

export default function Icon({ src, alt, isActive, onClick }: IconProps) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <Image 
        src={src} 
        alt={alt} 
        width={44} 
        height={44} 
        className={`transition duration-200 ${isActive ? 'filter-red' : ''}`} 
      />
      {isActive && (
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={src} 
            alt={alt} 
            width={44} 
            height={44} 
            style={{ filter: 'invert(36%) sepia(83%) saturate(7500%) hue-rotate(330deg)' }} 
          />
        </div>
      )}
    </div>
  );
}
