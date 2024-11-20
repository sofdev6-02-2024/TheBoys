import React from "react";
import ExerciseStatusButton from "./ExerciseStatusButton";
import { FaTimes } from "react-icons/fa";

interface PopupProps {
  gifUrl: string;
  name: string;
  instructions: string[];
  reps: number | null;
  exerciseStatus: "completed" | "in progress" | "not started";
  onClose: () => void;
  onStatusChange: (newStatus: "completed" | "in progress" | "not started") => void;
  onRepsChange: (reps: number) => void;
}

const Popup: React.FC<PopupProps> = ({
  gifUrl,
  name,
  instructions,
  reps,
  exerciseStatus,
  onClose,
  onStatusChange,
  onRepsChange
}) => {
  const handleRepetitionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = parseInt(newValue, 10);
    if (numericValue >= 0) {
      onRepsChange(numericValue);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#28292E] p-6 rounded-lg shadow-md w-85 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-white">{name}</h2>
        <img
          src={gifUrl}
          alt={`Ejercicio ${name}`}
          className="w-full sm:h-96 h-52 object-contain mb-4"
        />
<div className="mb-4 text-white flex flex-col items-center">
  <h3 className="text-xl font-semibold mb-2">Instrucciones:</h3>
  <ul className="list-disc pl-5 text-center">
    {instructions.map((instruction, index) => (
      <li key={index} className="whitespace-normal break-words max-w-2xl">
        {instruction}
      </li>
    ))}
  </ul>
</div>

<div className="flex items-center justify-center mb-4 ">
  <label htmlFor="reps" className="mr-4 text-white">Repeticiones:</label>
  <input
    id="reps"
    value={reps || ""}
    onChange={handleRepetitionsChange}
    className="w-20 p-2 text-center rounded text-white bg-[#28292E] border-2  border-black"
  />
</div>
        <div className="flex justify-center">
          <ExerciseStatusButton
            status="not started" 
            currentStatus={exerciseStatus}
            onClick={onStatusChange}
          />
          <ExerciseStatusButton
            status="in progress"
            currentStatus={exerciseStatus}
            onClick={onStatusChange}
          />
          <ExerciseStatusButton
            status="completed"
            currentStatus={exerciseStatus}
            onClick={onStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
