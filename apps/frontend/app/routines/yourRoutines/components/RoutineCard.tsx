import React from 'react';

interface RoutineCardProps {
  title: string;
  imageUrl: string;
  exercises: Array<any>;
  userStatus: 'completed' | 'in progress' | 'not started';
}

const RoutineCard: React.FC<RoutineCardProps> = ({ title, imageUrl, exercises, userStatus }) => {
  const totalExercises = exercises.length;
  const completedExercises = exercises.filter(exercise => exercise.status === 'completed').length;

  let progress = 0;
  if (userStatus === 'in progress') {
    progress = (completedExercises / totalExercises) * 100;
  } else if (userStatus === 'completed') {
    progress = 100;
  }

  const strokeDasharray = `${(progress / 100) * 283}, 283`;
  const circleRadius = 40;

  let circleColor = "#dcdcdc";
  if (userStatus === 'in progress') {
    circleColor = "#0043CE";
  } else if (userStatus === 'completed') {
    circleColor = "#0043CE";
  }

    return (
<div className="relative rounded-lg overflow-hidden shadow-lg w-full h-auto xxl:w-[450px] xxl:h-[250px] flex-shrink-0 group">
  <img
    src={imageUrl}
    alt={title}
    className="object-cover w-[450px] h-[250px]" 
  />
  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

        
        {(userStatus === 'in progress' || userStatus === 'completed' || userStatus === 'not started') && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                stroke="#dcdcdc"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                stroke={circleColor}
                strokeWidth="10"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
              />
              <text
                x="60"
                y="65"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="24"
                fontWeight="bold"
                fill="white" 
              >
                {userStatus === 'completed' ? '100%' : `${progress.toFixed(0)}%`}
              </text>
            </svg>
          </div>
        )}
  
        <div className="absolute bottom-48 left-0 p-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <button className="mt-36 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600">
            Start Routine
          </button>
        </div>
      </div>
    );
  };
  

export default RoutineCard;
