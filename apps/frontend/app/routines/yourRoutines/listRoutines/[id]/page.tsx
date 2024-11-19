"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProgressMessage from "./ProgressMessage";
import ProgressBar from "./ProgressBar";
import Pagination from "./Pagination";
import ExerciseCard from "./ExerciseCard";


interface Exercise {
  id: string;
  routineId: string;
  exerciseId: string;
  repetitions: number | null;
  time: number | null;
  status: "completed" | "in progress" | "not started";
}

interface DetailedExercise {
  id: string;
  name: string;
  gifUrl: string;
  instructions: string[];
}

interface Routine {
  id: string;
  exercises: Exercise[];
}

const RoutineExercisesPage: React.FC = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState<(Exercise & DetailedExercise)[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  useEffect(() => {
    const fetchRoutineAndExercises = async () => {
      try {
        setLoading(true);

        const routineRes = await fetch("http://localhost:4444/routines/user/673a9754eda4707d9db77058");
        if (!routineRes.ok) {
          throw new Error(`Error fetching routines: ${routineRes.statusText}`);
        }
        const routines: Routine[] = await routineRes.json();
        const foundRoutine = routines.find((routine) => routine.id === id);
        if (!foundRoutine) {
          throw new Error(`No routine found with ID: ${id}`);
        }

        const exerciseRes = await fetch("http://localhost:4444/exercises");
        if (!exerciseRes.ok) {
          throw new Error(`Error fetching exercises: ${exerciseRes.statusText}`);
        }
        const allExercises: DetailedExercise[] = await exerciseRes.json();

        const detailedExercises = foundRoutine.exercises.map((exercise) => {
          const detailed = allExercises.find((e) => e.id === exercise.exerciseId);
          return detailed
            ? { ...exercise, ...detailed }
            : { ...exercise, name: "Unknown", gifUrl: "", instructions: [] };
        });

        setExercises(detailedExercises);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutineAndExercises();
  }, [id]);

  const totalPages = exercises ? Math.ceil(exercises.length / exercisesPerPage) : 1;
  const completedExercises = exercises?.filter((exercise) => exercise.status === "completed").length || 0;
  const currentExercises = exercises?.slice(
    (currentPage - 1) * exercisesPerPage,
    currentPage * exercisesPerPage
  );
  const progressPercentage = exercises ? (completedExercises / exercises.length) * 100 : 0;

  if (loading) return <p className="text-white">Cargando ejercicios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!exercises || exercises.length === 0)
    return <p className="text-white">No se encontraron ejercicios para la rutina con ID: {id}</p>;

  return (
    <div className="p-4">
      
      <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-gray-800 max-w-[400px] w-full ml-4">
        <ProgressMessage progressPercentage={progressPercentage} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {currentExercises?.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            gifUrl={exercise.gifUrl}
            name={exercise.name}
            status={exercise.status}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutineExercisesPage;
