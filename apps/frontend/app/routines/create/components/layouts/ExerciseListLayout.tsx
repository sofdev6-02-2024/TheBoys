import { Exercise, ExerciseListLayoutProps } from "@/app/types";
import ExerciseListItem from "../atoms/ExerciseListItem";

function ExerciseListLayout(prop: ExerciseListLayoutProps) {
  const handleRemoveExercise = (exercise: Exercise) => {
    prop.setExercises(prop.exercises.filter((e) => e !== exercise));
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Exercises</h2>
      <ul>
        {prop.exercises.map((exercise, index) => (
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
