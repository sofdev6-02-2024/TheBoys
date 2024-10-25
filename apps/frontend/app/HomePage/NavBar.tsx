
"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface IconType {
  id: string;
  src: StaticImageData;
  alt: string;
}

interface HeaderProps {
  appName: string;
  logoSrc: StaticImageData;
  menuItems: string[];
  icons: IconType[];
  menuIcon: StaticImageData;
  notificationIcon: StaticImageData;
  userIcon: StaticImageData;
 
}

const handleMenuItemClick = (item: string) => {
  console.log(`${item} clicked`);
};

const handleIconClickMessage = (id: string) => {
  console.log(`Icon clicked: ${id}`);
};

export default function NavBar({
  appName,
  logoSrc,
  menuItems,
  icons,
  menuIcon,
  notificationIcon,
  userIcon,
  
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleIconClick = (id: string) => {
    setActiveIcon(id);
    handleIconClickMessage(id)
    
  };

  return (
    <div className="bg-[#28292E]">
      <header className="relative flex items-center justify-between py-4">
        <div className="hidden sm:flex cursor-pointer px-5">
          <Image 
            src={menuIcon} 
            alt="Menu icon" 
            width={44} 
            height={44} 
            onClick={toggleMenu} 
          />
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex flex-row items-center">
            <code className="text-3xl font-semibold text-white px-5">
              {appName}
            </code>
            <Image src={logoSrc} alt="App logo" width={70} height={70} priority />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 px-5">
          <div className="cursor-pointer">
            <Image src={notificationIcon} alt="Notification icon" width={44} height={44} />
          </div>
          <div className="cursor-pointer">
            <Image src={userIcon} alt="User icon" width={44} height={44} />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute top-20 left-35 bg-[#1E1E24] text-white flex flex-col items-start py-2 px-4 rounded-sm  z-50">
          {menuItems.map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 bg-[#33333D] hover:bg-[#44444F] rounded my-1"
              onClick={() => handleMenuItemClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <footer className="w-full bg-[#28292E] p-2 fixed bottom-0 block sm:hidden z-50">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {icons.map(({ id, src, alt }) => (
            <div key={id} className="relative cursor-pointer" onClick={() => handleIconClick(id)}>
              <Image 
                src={src} 
                alt={alt} 
                width={44} 
                height={44} 
                className={`transition duration-200 ${activeIcon === id ? 'filter-red' : ''}`} 
              />
              {activeIcon === id && (
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
          ))}
        </div>
      </footer>
    </div>
  );
}
