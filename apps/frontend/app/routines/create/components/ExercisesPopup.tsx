"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { Exercise, PopupProps } from "@/app/types";
import ExerciseCard from "./atoms/ExerciseDisplay";

function ExercisesPopup(props: PopupProps) {
  const [selectedExercises, setSelectedExercises] = useState([] as Exercise[]);
  const [availableExercises, setAvailableExercises] = useState(
    [] as Exercise[],
  );

  const handleAddExercise = () => {
    props.setRoutineExercises([...props.exercises, ...selectedExercises]);
    props.handleClose();
  };

  const handleAddSelectedExercise = (exercise: Exercise) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exercise)) {
        return prevSelected.filter((e) => e !== exercise);
      } else {
        return [...prevSelected, exercise];
      }
    });
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const localExercises = localStorage.getItem("exercises");
      if (!localExercises) {
        const res = await fetch("http://localhost:4444/exercises");
        const data = await res.json();
        setAvailableExercises(data);
        localStorage.setItem("exercises", JSON.stringify(data));
      } else {
        setAvailableExercises(JSON.parse(localExercises));
      }
    };
    fetchExercises();
  }, []);

  return (
    <dialog
      className="absolute flex flex-col top-1/2 left-1/2 transform 
      -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-primary-default 
      border border-whiteGray rounded-md p-5 text-white gap-4"
    >
      <section className="justify-between items-center md:text-left text-center">
        <h2 className="lg:text-2xl md:text-lg text-md font-bold">
          Select exercises
        </h2>
      </section>
      <section className="flex overflow-y-scroll">
        <ul
          className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5
          justify-center"
        >
          {availableExercises.map((exercise, i) => (
            <ExerciseCard
              key={i}
              exerciseName={exercise.name}
              exerciseGif={exercise.gifUrl}
              isSelected={selectedExercises.includes(exercise)}
              onClick={() => handleAddSelectedExercise(exercise)}
            />
          ))}
        </ul>
      </section>
      <section className="flex justify-center">
        <Button backgroundColor="primary" onClick={props.handleClose}>
          <p>Cancel</p>
        </Button>
        <Button backgroundColor="secondary" onClick={handleAddExercise}>
          <p>Add Exercises</p>
        </Button>
      </section>
    </dialog>
  );
}

export default ExercisesPopup;
