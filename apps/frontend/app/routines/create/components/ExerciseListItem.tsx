import { IconButton } from "@/app/components/Button";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

export interface Props {
  exerciseName: string;
  onRemove: () => void;
  exerciseGif: string;
  style?: string;
}

function ExerciseListItem({
  exerciseName,
  onRemove,
  exerciseGif,
  style,
}: Props) {
  return (
    <li
      className={`flex mb-6 bg-primary-active rounded-md px-5 py-3 justify-between ${style}`}
    >
      <figure className="flex gap-6 items-center">
        <Image
          src={exerciseGif}
          alt={exerciseName}
          width={75}
          height={75}
          className="rounded-md"
          loading="lazy"
        />
        <figcaption className="text-xl">{exerciseName}</figcaption>
      </figure>
      <IconButton type="button" onClick={onRemove}>
        <FaTrashAlt className="h-10 w-10" />
      </IconButton>
    </li>
  );
}

export default ExerciseListItem;
