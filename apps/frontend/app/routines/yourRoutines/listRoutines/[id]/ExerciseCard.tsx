import React, { useState } from "react";
import { FaCheckCircle, FaPauseCircle, FaRegCircle, FaTimes } from "react-icons/fa"; // Iconos para los estados
import ProgressCircle from "../../components/ProgressCircle";

interface ExerciseCardProps {
  gifUrl: string;
  name: string;
  status: "completed" | "in progress" | "not started";
  instructions: string[]; // Instrucciones como un arreglo de strings
  repetitions: number | null;  // Repeticiones pueden ser null
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  gifUrl,
  name,
  status,
  instructions,
  repetitions,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [exerciseStatus, setExerciseStatus] = useState(status); // Estado dinámico
  const [reps, setReps] = useState<number | null>(repetitions); // Estado para repeticiones

  const isInProgressOrCompleted = exerciseStatus !== "not started";
  const hasProgress = exerciseStatus === "completed" || exerciseStatus === "in progress";

  const handleClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Función para cambiar el estado del ejercicio
  const changeStatus = (newStatus: "completed" | "in progress" | "not started") => {
    setExerciseStatus(newStatus);
  };

  // Función para manejar el cambio de repeticiones
  const handleRepetitionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // Convertir el valor a número y asegurarse de que sea positivo
    const numericValue = parseInt(newValue, 10);
    if (numericValue >= 0) {
      setReps(numericValue); // Solo actualizar si es un número positivo
    }
  };

  return (
    <div className="relative w-full h-[400px] rounded overflow-hidden shadow-md mx-auto ">
      <button
        onClick={handleClick}
        className="w-full h-full"
        aria-label={`Seleccionar ejercicio ${name}`}
      >
        <img
          src={gifUrl}
          alt={`Ejercicio ${name}`}
          className={`w-full h-full object-contain transition-all duration-500 ${
            hasProgress ? "filter brightness-50" : ""
          }`}
          style={{ maxHeight: "460px" }}
        />
        {isInProgressOrCompleted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ProgressCircle
              progress={exerciseStatus === "in progress" ? 50 : 100}
              userStatus={exerciseStatus}
            />
          </div>
        )}
      </button>
      <div className="absolute top-6 left-28 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
        {name}
      </div>

      {/* Pop-up */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#28292E] p-6 rounded-lg shadow-md w-85 relative">
            {/* Botón de cerrar dentro del pop-up */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-white">{name}</h2>
            <img
              src={gifUrl}
              alt={`Ejercicio ${name}`}
              className="w-full sm:h-96 h-52 object-contain mb-4" //96
            />
            <div className="text-gray-300 mb-4">
              <span className="block font-bold text-center">Instrucciones:</span>
              <ul className="list-disc list-inside mt-2">
                {instructions.map((instruction, index) => (
                  <li key={index} className="text-center">
                    {instruction.length > 85 ? (
                      <>
                        {instruction.slice(0, 85)}<br />
                        {instruction.slice(85)}
                      </>
                    ) : (
                      instruction
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Input de repeticiones editable */}
            <p className="text-gray-200 mb-2 text-center">
              <span className="font-bold">Repeticiones:</span>
              <input
               
                value={reps !== null ? reps : 0}
                onChange={handleRepetitionsChange}
                min="0"
                className="bg-[#28292E] text-white text-center p-2 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 w-20"
              />
            </p>

            <p className="text-gray-300 mb-4 text-center">
              <span className="font-bold">Estado:</span>
              {/* Botones de estado con iconos */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => changeStatus("not started")}
                  className={`flex items-center px-4 py-2 rounded mx-2 text-white ${
                    exerciseStatus === "not started" ? "bg-yellow-400 border-2 border-white" : "bg-gray-500"
                  }`}
                >
                  <FaRegCircle className="mr-2" /> No Iniciado
                </button>
                <button
                  onClick={() => changeStatus("in progress")}
                  className={`flex items-center px-4 py-2 rounded mx-2 text-white ${
                    exerciseStatus === "in progress" ? "bg-blue-500 border-2 border-white" : "bg-gray-500"
                  }`}
                >
                  <FaPauseCircle className="mr-2" /> En Progreso
                </button>
                <button
                  onClick={() => changeStatus("completed")}
                  className={`flex items-center px-4 py-2 rounded mx-2 text-white ${
                    exerciseStatus === "completed" ? "bg-green-500 border-2 border-white" : "bg-gray-500"
                  }`}
                >
                  <FaCheckCircle className="mr-2" /> Completado
                </button>
              </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
