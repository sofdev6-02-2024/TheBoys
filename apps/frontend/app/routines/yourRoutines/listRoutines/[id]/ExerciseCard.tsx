import React from "react";
import ProgressCircle from "../../components/ProgressCircle";


interface ExerciseCardProps {
  gifUrl: string;
  name: string;
  status: "completed" | "in progress" | "not started";
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ gifUrl, name, status }) => {
  const isInProgressOrCompleted = status !== "not started";
  const hasProgress = status === "completed" || status === "in progress";

  return (
    <div className="relative w-full h-[400px] rounded overflow-hidden shadow-md mx-auto">
      <img
        src={gifUrl}
        alt={`Ejercicio ${name}`}
        className={`w-full h-full object-contain transition-all duration-500 ${
          hasProgress ? "filter brightness-50" : ""
        }`}
        style={{ maxHeight: "460px" }}
      />
      <div className="absolute top-6 left-28 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
        {name}
      </div>
      {isInProgressOrCompleted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ProgressCircle
            progress={status === "in progress" ? 50 : 100}
            userStatus={status}
          />
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
