
import React, { useState } from "react";
import ProgressCircle from "../../../components/ProgressCircle";
import Popup from "./Popup";
import Notification from "./Notification";
import Image from 'next/image';

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
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleClick = () => {
    setPopupVisible(true);
  };

  const closePopup = async () => {
    await updateExercise(); 
    setPopupVisible(false); 
  };

  const changeStatus = (newStatus: "completed" | "in progress" | "not started") => {
    setExerciseStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }
  };

  const updateExercise = async () => {
    setLoading(true);
    const url = `http://localhost:4444/routines/${routineId}`;
    const body = {
      exercises: [
        {
          id: id,
          repetitions: reps !== null ? reps : 0,
          time: 30,
          status: exerciseStatus,
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error updating the fiscal year");
      }

      showNotification("Exercise successfully updated.", "success");
    } catch (error) {
      showNotification("An error occurred while updating the exercise.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null); 
    }, 2000);
  };

  const getProgress = () => {
    switch (exerciseStatus) {
      case "completed":
        return 100;
      case "in progress":
        return 50;
      case "not started":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="relative w-full h-[400px] rounded overflow-hidden shadow-md mx-auto ">
      <button
        onClick={handleClick}
        className="w-full h-full"
        aria-label={`Seleccionar ejercicio ${name}`}
      >
        <Image
          src={gifUrl}
          alt={`Ejercicio ${name}`}
          className={`w-full h-full object-contain transition-all duration-500 ${
            exerciseStatus !== "not started" ? "filter brightness-50" : ""
          }`}
          style={{ maxHeight: "460px" }}
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

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
};

export default ExerciseCard;
