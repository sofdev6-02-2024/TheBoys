import { Exercise } from "@/app/types";
import ExerciseListItem from "./ExerciseListItem";

interface Props {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
}

function ExerciseListLayout({ exercises, setExercises }: Props) {
  const handleRemoveExercise = (exercise: Exercise) => {
    setExercises(exercises.filter((e) => e !== exercise));
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Exercises</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <ExerciseListItem
            key={index}
            exerciseName={exercise.name}
            exerciseGif={exercise.gifUrl}
            onRemove={() => handleRemoveExercise(exercise)}
          />
        ))}
      </ul>
    </section>
  );
}

export default ExerciseListLayout;
