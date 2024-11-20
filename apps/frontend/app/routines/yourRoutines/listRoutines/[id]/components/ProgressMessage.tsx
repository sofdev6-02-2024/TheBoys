import React from "react";
import ProgressBar from "./ProgressBar";

interface ProgressMessageProps {
  progressPercentage: number;
}

const ProgressMessage: React.FC<ProgressMessageProps> = ({ progressPercentage }) => {
  const getMessage = () => {
    if (progressPercentage === 100) return `${progressPercentage}% Nice one!!`;
    if (progressPercentage > 0) return `${progressPercentage}% Keep training... `;
    return `${progressPercentage}% Let´s start!! `;
  };

  const getIcon = () => {
    if (progressPercentage === 100) return "✔";
    if (progressPercentage > 0) return "🔵";
    return "🟡";
  };

  return (
    <div className="flex items-center gap-2">
      
      <div className="absolute top-32 ml-20 sm:ml-20 md:ml-26 lg:ml-36">
            <p className="text-white text-lg font-bold">{getMessage()}</p>
          </div>
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full ${
          progressPercentage === 100
            ? "bg-green-500"
            : progressPercentage > 0
            ? "bg-blue-500"
            : "bg-yellow-500"
        }`}
      >
        <span className="text-white text-4xl">{getIcon()}</span>
      </div>


          <ProgressBar percentage={progressPercentage} color={progressPercentage === 100 ? "bg-green-500" : "bg-blue-500"} />

    </div>


  );
};

export default ProgressMessage;
