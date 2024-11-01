"use client";

import RoutineInfoForm from "../molecules/RoutineInfoForm";
import ExerciseControl from "../molecules/ExerciseControl";
import { useState } from "react";
import { Exercise } from "@/app/types";

function RoutineFormWrapper() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([] as Exercise[]);

  return (
    <section className="flex flex-col gap-6 w-2/3 place-self-center">
      <RoutineInfoForm setTitle={setTitle} setDescription={setDescription} />
      <ExerciseControl
        exercises={exercises}
        setExercises={setExercises}
        title={title}
        description={description}
      />
    </section>
  );
}

export default RoutineFormWrapper;
