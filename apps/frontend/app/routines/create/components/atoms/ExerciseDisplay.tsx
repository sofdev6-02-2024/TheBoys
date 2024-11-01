import { ExerciseCardProps } from "@/app/types";
import Image from "next/image";

function ExerciseCard(props: ExerciseCardProps) {
  return (
    <li className="relative">
      <button
        className={`absolute top-0 right-0 w-full h-full 
          ${!props.isSelected && "bg-primary-default bg-opacity-45"}`}
        onClick={props.onClick}
      />
      <figure>
        <Image
          src={props.exerciseGif}
          className={"rounded-md w-full h-full"}
          width={250}
          height={250}
          alt={props.exerciseName}
          loading="lazy"
        />
        <figcaption
          className= "flex w-full text-center text-white text-lg max-w-full overflow-hidden"
          
        >
          {props.exerciseName}
        </figcaption>
      </figure>
    </li>
  );
}

export default ExerciseCard;
