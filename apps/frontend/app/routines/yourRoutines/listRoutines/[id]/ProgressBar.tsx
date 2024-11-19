import React from "react";

interface ProgressBarProps {
  percentage: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color }) => (
  <div className="relative w-[300px] bg-gray-200 h-2">
    <div
      className={`absolute top-0 left-0 h-full ${color}`}
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export default ProgressBar;
