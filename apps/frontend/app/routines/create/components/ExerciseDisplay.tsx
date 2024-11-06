import Image from "next/image";

interface Props {
  onClick: () => void;
  exerciseName: string;
  exerciseGif: string;
  isSelected: boolean;
}

function ExerciseCard({
  onClick,
  exerciseName,
  exerciseGif,
  isSelected,
}: Props) {
  return (
    <li className="relative">
      <button
        className={`absolute top-0 right-0 w-full h-full 
          ${!isSelected && "bg-primary-default bg-opacity-45"}`}
        onClick={onClick}
        type="button"
      />
      <figure>
        <Image
          src={exerciseGif}
          className={"rounded-md w-full h-full"}
          width={250}
          height={250}
          alt={exerciseName}
          loading="lazy"
        />
        <figcaption className="flex w-full text-center text-white text-lg max-w-full overflow-hidden">
          {exerciseName}
        </figcaption>
      </figure>
    </li>
  );
}

export default ExerciseCard;
