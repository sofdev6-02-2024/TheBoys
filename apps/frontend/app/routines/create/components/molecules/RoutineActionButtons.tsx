"use client";

import Button from "@/app/components/Button";
import { FaDumbbell } from "react-icons/fa";
import { useState } from "react";
import { Exercise, RoutineActionButtonsProps } from "@/app/types";
import ExercisesPopup from "../ExercisesPopup";

function RoutineActionButtons(props: RoutineActionButtonsProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddExercise = (newExercises: Exercise[]) => {
    props.setExercises(newExercises);
  };

  const handleCreateRoutine = async () => {
    const res = await fetch("http://localhost:4444/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: props.title,
        difficultLevel: props.description,
        exercises: props.exercises.map(() => "2b30809b-0d12-4786-b633-918240c11b7c"),
      }),
    });

    if (res.ok) {
      alert("Routine created successfully");
    } else {
      alert("Error creating routine");
    }
  };

  return (
    <section
      className="flex md:flex-row flex-col gap-y-4 md:justify-between
      items-center"
    >
      {showPopup && (
        <ExercisesPopup
          handleClose={() => setShowPopup(false)}
          setRoutineExercises={handleAddExercise}
          exercises={props.exercises}
        />
      )}
      <Button
        type="button"
        backgroundColor="primary"
        className="flex gap-3 border border-whiteGray items-center"
        onClick={() => setShowPopup(!showPopup)}
      >
        <p>Add new exercises</p>
        <FaDumbbell className="h-6 w-6" />
      </Button>
      <Button
        type="button"
        backgroundColor="secondary"
        onClick={handleCreateRoutine}
      >
        <p>Finish</p>
      </Button>
    </section>
  );
}

export default RoutineActionButtons;
