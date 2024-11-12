import React, { useState } from 'react';
import ProgressCircle from './ProgressCircle';

interface Exercise {
    status: 'completed' | 'in progress' | 'not started';
  }

interface RoutineCardProps {
  title: string;
  imageUrl: string;
  exercises: Exercise[];
  userStatus: 'completed' | 'in progress' | 'not started';
}

const RoutineCard: React.FC<RoutineCardProps> = ({ title, imageUrl, exercises, userStatus }) => {
  const totalExercises = exercises.length;
  const completedExercises = exercises.filter(exercise => exercise.status === 'completed').length;
  const progress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
  const [started, setStarted] = useState(progress > 0);

  const handleStartRoutine = () => {
    setStarted(true);
  };

  const handleOverlayClick = () => {
    if (started) {
      alert("Routine in progress");
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-auto xxl:w-[450px] xxl:h-[250px] flex-shrink-0 group">
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-[450px] h-[250px]"
      />

      {(started || progress > 0) && (
        <div
          onClick={handleOverlayClick}
          className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 cursor-pointer"
        />
      )}

      {(started || progress > 0) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ProgressCircle progress={progress} userStatus={userStatus} />
        </div>
      )}

      <div className="absolute bottom-48 left-0 p-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>

      {!started && progress === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <button
            onClick={handleStartRoutine}
            className="mt-36 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          >
            Start Routine
          </button>
        </div>
      )}
    </div>
  );
};

export default RoutineCard;

