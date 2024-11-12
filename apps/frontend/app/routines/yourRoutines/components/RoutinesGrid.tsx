"use client";

import React, { useEffect, useState } from "react";
import RoutineCard from "./RoutineCard";
// import mockRoutineData from "../routineExample";

interface Exercise {
  status: 'completed' | 'in progress' | 'not started';
}

interface Routine {
  id: string;
  title: string;
  imageUrl: string;
  exercises: Exercise[];
}

const RoutinesGrid: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId'); 
    setUserId(loggedInUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchRoutines = async () => {
        try {
          const res = await fetch(`http://localhost:4444/routines/user/${userId}`);
          const data: Routine[] = await res.json();
          setRoutines(data);
        } catch (error) {
          console.error("Error in obtaining the routines:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRoutines();
    }
  }, [userId]);

  if (loading) {
   return <div className="text-white text-center">Loading routines...</div>;
  }

 return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-4 bg-[#28292E]">
      {routines.map((routine) => {
        const exercises: Exercise[] = routine.exercises.map((ex) => ({
          ...ex,
          status: ex.status as 'completed' | 'in progress' | 'not started', 
        }));

        const userStatus: 'completed' | 'in progress' | 'not started' = exercises.every(
          (ex) => ex.status === 'completed'
        )
          ? 'completed'
          : exercises.some((ex) => ex.status === 'in progress')
          ? 'in progress'
          : 'not started';

        return (
          <RoutineCard
            key={routine.id}
            title={routine.title}
            imageUrl={routine.imageUrl}
            exercises={exercises}
            userStatus={userStatus}
          />
        );
      })}
    </div>
  );
};

export default RoutinesGrid;
