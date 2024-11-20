"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProgressMessage from "./components/ProgressMessage";
import Pagination from "./components/Pagination";
import ExerciseCard from "./components/ExerciseCard";

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
  exerciseId: string;
}

interface Routine {
  id: string;
  exercises: Exercise[];
}

const RoutineExercisesPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;

  const [userId, setUserId] = useState<string | null>(null);
  const [exercises, setExercises] = useState<(Exercise & DetailedExercise)[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    setUserId(loggedInUserId);
  }, []);

  useEffect(() => {
    if (!id || !userId) {
      if (!id) setError("A routine ID was not provided.");
      if (!userId) setError("User is not logged in.");
      setLoading(false);
      return;
    }

    const fetchRoutineAndExercises = async () => {
      try {
        setLoading(true);

        const routineRes = await fetch(`http://localhost:4444/routines/user/${userId}`);
        if (!routineRes.ok) {
          throw new Error(`Error in obtaining the routines: ${routineRes.statusText}`);
        }
        const routines: Routine[] = await routineRes.json();
        const foundRoutine = routines.find((routine) => routine.id === id);
        if (!foundRoutine) {
          throw new Error(`No routine was found with the ID: ${id}`);
        }

        const exerciseRes = await fetch("http://localhost:4444/exercises");
        if (!exerciseRes.ok) {
          throw new Error(`Error in obtaining the exercises:  ${exerciseRes.statusText}`);
        }
        const allExercises: DetailedExercise[] = await exerciseRes.json();

        const detailedExercises = foundRoutine.exercises.map((exercise) => {
          const detailedById = allExercises.find((e) => e.id === exercise.exerciseId);
        
          if (detailedById) {
            return {
              ...detailedById, 
              id: exercise.id,
              exerciseId: exercise.exerciseId,  
              routineId: exercise.routineId,   
              repetitions: exercise.repetitions,
              time: exercise.time,
              status: exercise.status,
            };
          } else {
            return {
              ...exercise,  
              name: "Unknown",
              gifUrl: "",
              instructions: [],
            };
          }
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

  const calculateProgress = (exercises: (Exercise & DetailedExercise)[]) => {
    const totalExercises = exercises.length;
    const completedExercises = exercises.filter(ex => ex.status === "completed").length;
    const inProgressExercises = exercises.filter(ex => ex.status === "in progress").length;

    return ((completedExercises + inProgressExercises * 0.5) / totalExercises) * 100;
  };

  const totalPages = exercises ? Math.ceil(exercises.length / exercisesPerPage) : 1;
  const currentExercises = exercises?.slice(
    (currentPage - 1) * exercisesPerPage,
    currentPage * exercisesPerPage
  );

  const handleStatusChange = (id: string | undefined, newStatus: "completed" | "in progress" | "not started") => {
    setExercises((prevExercises) => {
      if (prevExercises === null) {
        return [];
      }
      return prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, status: newStatus } : exercise
      );
    });
  };
  
  const progressPercentage = exercises ? calculateProgress(exercises) : 0;

  if (loading) return <p className="text-white">Cargando ejercicios...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!exercises || exercises.length === 0)
    return <p className="text-white">No exercises were found for the routine with ID: {id}</p>;

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
            instructions={exercise.instructions}
            repetitions={exercise.repetitions}
            routineId={exercise.routineId}
            id={exercise.id}
            onStatusChange={handleStatusChange}  
          />
        ))}
      </div>
    </div>
  );
};

export default RoutineExercisesPage;