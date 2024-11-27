import React, { useState } from "react";
import { toast } from "sonner";
import ProgressCircle from "../../../components/ProgressCircle";
import Popup from "./Popup";
import Image from "next/image";
import { updateExercise } from "@/app/utils/Connections/connectionsRoutine";

interface ExerciseCardProps {
  gifUrl: string;
  name: string;
  status: "completed" | "in progress" | "not started";
  instructions: string[];
  repetitions: number | null;
  routineId: string | string[];
  id?: string;
  onStatusChange?: (id: string | undefined, newStatus: "completed" | "in progress" | "not started") => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  gifUrl,
  name,
  status,
  instructions,
  repetitions,
  routineId,
  id,
  onStatusChange,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [exerciseStatus, setExerciseStatus] = useState<"completed" | "in progress" | "not started">(status);
  const [reps, setReps] = useState<number | null>(repetitions);
  const [, setLoading] = useState(false);

  const handleClick = () => {
    setPopupVisible(true);
  };

  const closePopup = async () => {
    await handleUpdateExercise(); 
    setPopupVisible(false);
  };

  const changeStatus = (newStatus: "completed" | "in progress" | "not started") => {
    setExerciseStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  const handleUpdateExercise = async () => {
    setLoading(true);

    try {
      await updateExercise(routineId, id, exerciseStatus, reps);
      toast.success("Exercise successfully updated.");
    } catch (error) {
      toast.error("An error occurred while updating the exercise.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = () => {
    const progressMap: { [key: string]: number } = {
      completed: 100,
      "in progress": 50,
      "not started": 0,
    };
  
    return progressMap[exerciseStatus] ?? 0;
  };

  return (
    <div className="relative w-full h-[400px] rounded overflow-hidden shadow-md mx-auto">
      <button
        onClick={handleClick}
        className="w-full h-full"
        aria-label={`Select exercise ${name}`}
      >
        <Image
          src={gifUrl}
          alt={`Exercise ${name}`}
          className={`w-full h-full object-contain transition-all duration-500 ${
            exerciseStatus !== "not started" ? "filter brightness-50" : ""
          }`}
          style={{ maxHeight: "460px" }}
          width={400}
          height={300}
        />
        {exerciseStatus !== "not started" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ProgressCircle
              progress={getProgress()}
              userStatus={exerciseStatus}
            />
          </div>
        )}
      </button>

      {isPopupVisible && (
        <Popup
          gifUrl={gifUrl}
          name={name}
          instructions={instructions}
          reps={reps}
          exerciseStatus={exerciseStatus}
          onClose={closePopup}
          onStatusChange={changeStatus}
          onRepsChange={setReps}
        />
      )}
    </div>
  );
};

export default ExerciseCard;
