

import motivationalImage from "../Images/HomePage/motivational.png"; 
import routinesImage from "../Images/HomePage/routines.png"; 
import chatImage from "../Images/HomePage/chat.png"; 
import calendarImage from "../Images/HomePage/calendar.png"; 
import ImageCard from "./ImageCard"

export default function HomePage() {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-3 h-screen overflow-hidden bg-[#28292E] sm:pb-5 pb-20"> 
      <ImageCard 
        className="col-span-1 sm:col-span-3 custom-row-span relative cursor-pointer group rounded-lg overflow-hidden" 
        src={motivationalImage} 
        alt="Motivational phrase" 
        label="“Every repetition brings you closer to your best version.” 💪" 
        onClickOption = "Frase motivadora"
     
      />

      <ImageCard 
        className="col-span-1 sm:col-span-2 row-span-1 relative cursor-pointer group rounded-lg overflow-hidden" 
        src={routinesImage} 
        alt="Routines" 
        label="Routines" 
        onClickOption = "Routines"
      />

      <ImageCard 
        className="col-span-1 sm:col-span-1 row-span-1 sm:row-span-2 relative cursor-pointer group rounded-lg overflow-hidden" 
        src={calendarImage} 
        alt="Calendar" 
        label="Calendar" 
        onClickOption = "Calendar"
  
      />

      <ImageCard 
        className="col-span-1 sm:col-span-2 row-span-1 relative cursor-pointer group rounded-lg overflow-hidden" 
        src={chatImage} 
        alt="ChatBot" 
        label="ChatBot" 
        onClickOption = "ChatBot"
        
      />

    </div>
  );
}

