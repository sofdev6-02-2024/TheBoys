import { IconButton } from "@/app/components/Button";
import { ExerciseListItemsProps } from "@/app/types";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

function ExerciseListItem(props: ExerciseListItemsProps) {
  return (
    <li
      className={`flex mb-6 bg-primary-active rounded-md px-5 py-3 justify-between ${props.style}`}
    >
      <figure className="flex gap-6 items-center">
        <Image
          src={props.exerciseGif}
          alt={props.exerciseName}
          width={75}
          height={75}
          className="rounded-md"
          loading="lazy"
        />
        <figcaption className="text-xl">{props.exerciseName}</figcaption>
      </figure>
      <IconButton type="button" onClick={props.onRemove}>
        <FaTrashAlt className="h-10 w-10" />
      </IconButton>
    </li>
  );
}

export default ExerciseListItem;
