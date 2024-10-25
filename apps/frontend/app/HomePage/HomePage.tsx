"use client";
import Image from "next/image";


import motivationalImage from "../Images/motivational.png"; 
import routinesImage from "../Images/routines.png"; 
import chatImage from "../Images/chat.png"; 
import calendarImage from "../Images/calendar.png"; 

export default function HomePage() {
  const handleImageClick = (text: string) => {
    console.log(text);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ms:py-5 p-8  h-screen overflow-hidden bg-[#28292E] sm:pb-5 pb-20"> 

      <div 
        className="col-span-1 sm:col-span-3 custom-row-span relative cursor-pointer group"
        onClick={() => handleImageClick("Frase motivadora")}
      >
        <Image 
          src={motivationalImage} 
          alt="Frase motivadora" 
          layout="fill" 
          objectFit="cover" 
          className="transition duration-300 transform group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
          Motivational phrase
          </span>
        </div>
      </div>

   
      <div 
        className="col-span-1 sm:col-span-2 row-span-1 relative cursor-pointer group"
        onClick={() => handleImageClick('Rutinas')}
      >
        <Image 
          src={routinesImage} 
          alt="Rutinas" 
          layout="fill" 
          objectFit="cover" 
          className="transition duration-300 transform group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
            Routines
          </span>
        </div>
      </div>

   
      <div 
        className="col-span-1 sm:col-span-1 row-span-1 sm:row-span-2 relative cursor-pointer group"
        onClick={() => handleImageClick('Calendar')}
      >
        <Image 
          src={calendarImage} 
          alt="Calendar" 
          layout="fill" 
          objectFit="cover" 
          className="transition duration-300 transform group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
            Calendar
          </span>
        </div>
      </div>

      
      <div 
        className="col-span-1 sm:col-span-2 row-span-1 relative cursor-pointer group"
        onClick={() => handleImageClick('ChatBot')}
      >
        <Image 
          src={chatImage} 
          alt="ChatBot" 
          layout="fill" 
          objectFit="cover" 
          className="transition duration-300 transform group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
            ChatBot
          </span>
        </div>
      </div>
    </div>
  );
}
