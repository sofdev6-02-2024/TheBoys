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
  let icon;
  let buttonText;
  let buttonColor;

  switch (status) {
    case "completed":
      icon = <FaCheckCircle className="mr-2" />;
      buttonText = "completed";
      buttonColor = currentStatus === status ? "bg-green-500 border-2 border-white" : "bg-green-200";
      break;
    case "in progress":
      icon = <FaPauseCircle className="mr-2" />;
      buttonText = "in progress";
      buttonColor = currentStatus === status ? "bg-blue-500 border-2 border-white" : "bg-blue-200";
      break;
    case "not started":
      icon = <FaRegCircle className="mr-2" />;
      buttonText = "not started";
      buttonColor = currentStatus === status ? "bg-yellow-500 border-2 border-white" : "bg-yellow-200";
      break;
  }

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
