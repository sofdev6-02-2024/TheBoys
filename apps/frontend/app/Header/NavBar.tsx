"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Icon from "./Icon"; 
import SubMenu from "./SubMenu";

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

const NavBar = ({
  appName,
  logoSrc,
  menuItems,
  icons,
  menuIcon,
  notificationIcon,
  userIcon,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuItemClick = (item: string) => {
    console.log(`${item} clicked`);
  };

  const handleIconClick = (id: string) => {
    setActiveIcon(id);
    console.log(`Icon clicked: ${id}`);
  };

  const renderIcon = (src: StaticImageData, alt: string, onClick: () => void) => (
    <Icon src={src} alt={alt} onClick={onClick} />
  );

  return (
    <div className="bg-[#28292E]">
      <header className="relative flex items-center justify-between py-4">
        <div className="hidden sm:flex cursor-pointer px-5">
          <Image src={menuIcon} alt="Menu icon" width={44} height={44} onClick={toggleMenu} 
          />
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex flex-row items-center">
            <code className="text-3xl font-semibold text-white px-5">{appName}</code>
            <Image src={logoSrc} alt="App logo" width={70} height={70} priority />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 px-5">
          {renderIcon(notificationIcon, "Notification icon", () => console.log("Notification clicked"))}
          {renderIcon(userIcon, "User icon", () => console.log("User clicked"))}
        </div>
      </header>

      {isMenuOpen && <SubMenu menuItemsSearch={menuItems} onClickItem={handleMenuItemClick} />}

      <footer className="w-full bg-[#28292E] p-2 fixed bottom-0 block sm:hidden z-50">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {icons.map(({ id, src, alt }) => (
            <Icon key={id} src={src} alt={alt} isActive={activeIcon === id} onClick={() => handleIconClick(id)} 
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

export default NavBar;

