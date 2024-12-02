import motivationalImage from "../../public/HomePage/motivational.png"; 
import routinesImage from "../../public/HomePage/routines.png"; 
import chatImage from "../../public/HomePage/chat.png"; 
import calendarImage from "../../public/HomePage/calendar.png"; 
import ImageCard from "./ImageCard";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-3 h-screen overflow-hidden bg-[#28292E] sm:pb-5 pb-20"> 
      <ImageCard 
        className="col-span-1 sm:col-span-3 custom-row-span relative" 
        src={motivationalImage} 
        alt="Motivational phrase" 
        label="“Every repetition brings you closer to your best version.” 💪" 
        onClickOption="Motivational"
      />

      <ImageCard 
        className="col-span-1 sm:col-span-2 row-span-1 relative" 
        src={routinesImage} 
        alt="Routines" 
        label="Routines" 
        onClickOption="Routines" 
      />

      <ImageCard 
        className="col-span-1 sm:col-span-1 row-span-1 sm:row-span-2 relative" 
        src={calendarImage} 
        alt="Calendar" 
        label="Calendar" 
        onClickOption="Payment" 
      />

      <ImageCard 
        className="col-span-1 sm:col-span-2 row-span-1 relative" 
        src={chatImage} 
        alt="ChatBot" 
        label="ChatBot" 
        onClickOption="ChatBot"
      />
    </div>
  );
}
