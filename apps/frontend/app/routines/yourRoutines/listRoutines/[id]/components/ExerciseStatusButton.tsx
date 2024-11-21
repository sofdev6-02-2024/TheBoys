import { FaCheckCircle, FaPauseCircle, FaRegCircle } from "react-icons/fa";

interface ExerciseStatusButtonProps {
  status: "completed" | "in progress" | "not started";
  currentStatus: "completed" | "in progress" | "not started";
  onClick: (status: "completed" | "in progress" | "not started") => void;
}

const ExerciseStatusButton: React.FC<ExerciseStatusButtonProps> = ({
  status,
  currentStatus,
  onClick,
}) => {
  const statusMap: {
    [key in "completed" | "in progress" | "not started"]: {
      icon: JSX.Element;
      buttonText: string;
      buttonColor: string;
    };
  } = {
    completed: {
      icon: <FaCheckCircle className="mr-2" />,
      buttonText: "completed",
      buttonColor:
        currentStatus === "completed"
          ? "bg-green-500 border-2 border-white"
          : "bg-green-200",
    },
    "in progress": {
      icon: <FaPauseCircle className="mr-2" />,
      buttonText: "in progress",
      buttonColor:
        currentStatus === "in progress"
          ? "bg-blue-500 border-2 border-white"
          : "bg-blue-200",
    },
    "not started": {
      icon: <FaRegCircle className="mr-2" />,
      buttonText: "not started",
      buttonColor:
        currentStatus === "not started"
          ? "bg-yellow-500 border-2 border-white"
          : "bg-yellow-200",
    },
  };

  const { icon, buttonText, buttonColor } = statusMap[status];

  return (
    <button
      onClick={() => onClick(status)}
      className={`flex items-center px-4 py-2 rounded mx-2 text-black ${buttonColor}`}
    >
      {icon} {buttonText}
    </button>
  );
};

export default ExerciseStatusButton;
