import React from 'react';

interface ProgressCircleProps {
  progress: number;
  userStatus: 'completed' | 'in progress' | 'not started';
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, userStatus }) => {
  const circleRadius = 40;
  const strokeDasharray = `${(progress / 100) * 283}, 283`;
  let circleColor = "#dcdcdc";

  if (userStatus === 'in progress') {
    circleColor = "#0043CE";
  } else if (userStatus === 'completed') {
    circleColor = "#0043CE";
  }

  return (
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
        {progress.toFixed(0)}%
      </text>
    </svg>
  );
};

export default ProgressCircle;
