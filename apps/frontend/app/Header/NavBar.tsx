"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import SubMenu from "./SubMenu";
import { ReactNode } from "react";
import RutasNavegacion from "../../ routes"; // Importar las rutas
import { useRouter } from 'next/navigation';

interface IconType {
  id: string;
  IconElement: JSX.Element; // Cambiado para aceptar el icono ya renderizado
  alt: string;
}

interface HeaderProps {
  appName: string;
  logoSrc: StaticImageData;
  menuItems: string[];
  icons: IconType[];
  menuIcon: ReactNode;          // Cambiado a ReactNode
  notificationIcon: ReactNode;   // Cambiado a ReactNode
  userIcon: ReactNode;           // Cambiado a ReactNode
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
  const router = useRouter(); 

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuItemClick = (item: string) => {
    console.log(`${item} clicked`);
    router.push(RutasNavegacion.HomePage)
  };

  const handleIconClick = (id: string) => {
    setActiveIcon(id);
    console.log(`Icon clicked: ${id}`);
  };

  return (
    <div className="bg-[#28292E]">
      <header className="relative flex items-center justify-between py-4">
        <div className="hidden sm:flex cursor-pointer px-5" onClick={toggleMenu}>
          {menuIcon}
        </div>
        <div className="flex-grow flex justify-center">
          <div className="flex flex-row items-center">
            <code className="text-3xl font-semibold text-white px-5">{appName}</code>
            <Image src={logoSrc} alt="App logo" width={70} height={70} priority />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 px-5">
          {notificationIcon}
          {userIcon}
        </div>
      </header>

      {isMenuOpen && <SubMenu menuItemsSearch={menuItems} onClickItem={handleMenuItemClick} />}

      <footer className="w-full bg-[#28292E] p-2 fixed bottom-0 block sm:hidden z-50">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {icons.map(({ id, IconElement, alt }) => (
            <div key={id} title={alt} onClick={() => handleIconClick(id)} className={`cursor-pointer ${activeIcon === id ? "text-red-500" : "text-white"}`}>
              {IconElement}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}


export default NavBar;
