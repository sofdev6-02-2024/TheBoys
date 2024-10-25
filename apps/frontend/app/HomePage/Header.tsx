"use client"; 

import { useState } from "react";
import Image from "next/image";
import menu from "../Images/menuIcon.png";
import notification from "../Images/notification.png";
import user from "../Images/user.png";
import logo from "../Images/logo.png";

export default function Header() {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#28292E] relative z-50"> 
      <main className="relative flex items-center justify-between">

        
        <div className="hidden sm:flex flex cursor-pointer px-5">
          <Image 
            src={menu} 
            alt="Menu icon" 
            width={44} 
            height={44} 
            objectFit="contain" 
            onClick={toggleMenu}
          />
        </div>

        
        <div className="flex-grow flex justify-center">
          <div className="flex flex-row items-center">
            <code className="text-3xl font-semibold text-white px-5">
              BODY BOOST
            </code>
            <Image
              src={logo}
              alt="app logo"
              width={70}
              height={70}
              priority
            />
          </div>
        </div>

      
        <div className="hidden sm:flex items-center gap-4 px-5"> 
          <div className="cursor-pointer" onClick={() => console.log("Notification icon clicked")}>
            <Image 
              src={notification} 
              alt="Notification icon" 
              width={44} 
              height={44} 
              objectFit="contain" 
            />
          </div>
          <div className="cursor-pointer" onClick={() => console.log("User icon clicked")}>
            <Image 
              src={user} 
              alt="User icon" 
              width={44} 
              height={44} 
              objectFit="contain" 
            />
          </div>
        </div>
      </main>

      
      {isMenuOpen && (
        <div className="absolute top-16 left-5 bg-[#1E1E24] text-white flex flex-col items-start py-2 px-4 rounded-sm shadow-lg z-50"> {/* Agregué z-50 para que esté por encima de todo */}
          <button className="w-full text-left px-4 py-2 bg-[#33333D] hover:bg-[#44444F] rounded my-1" onClick={() => console.log("Home clicked")}>
            Home
          </button>
          <button className="w-full text-left px-4 py-2 bg-[#33333D] hover:bg-[#44444F] rounded my-1" onClick={() => console.log("Community clicked")}>
            Community
          </button>
          <button className="w-full text-left px-4 py-2 bg-[#33333D] hover:bg-[#44444F] rounded my-1" onClick={() => console.log("Trainers clicked")}>
            Trainers
          </button>
        </div>
      )}

      <hr className="w-full border-t border-gray-500" />
    </div>
  );
}
