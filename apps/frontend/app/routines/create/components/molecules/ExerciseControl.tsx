import { ExerciseControlProps } from "@/app/types";
import ExerciseListLayout from "../layouts/ExerciseListLayout";
import RoutineActionButtons from "./RoutineActionButtons";


function ExerciseControl(props: ExerciseControlProps) {
  return (
    <section>
      <ExerciseListLayout exercises={props.exercises} setExercises={props.setExercises} />
      <RoutineActionButtons
        exercises={props.exercises}
        setExercises={props.setExercises}
        title={props.title}
        description={props.description}
      />
    </section>
  );
}

export default ExerciseControl;
