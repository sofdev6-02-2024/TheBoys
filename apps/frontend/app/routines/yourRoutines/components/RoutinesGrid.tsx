"use client";

import React, { useEffect, useState } from "react";
import RoutineCard from "./RoutineCard";
//import mockRoutineData from "../routineExample";

const RoutinesGrid: React.FC = () => {
  const [routines, setRoutines] = useState([]);
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
          const data = await res.json();
          setRoutines(data);
        } catch (error) {
          console.error("Error al obtener las rutinas:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRoutines();
    }
  }, [userId]);

  if (loading) {
   return <div className="text-white text-center">Cargando rutinas...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-4 bg-[#28292E]">
      {routines.map((routine: any) => {
        const userStatus = routine.exercises.every((ex: any) => ex.status === "completed")
          ? "completed"
          : routine.exercises.some((ex: any) => ex.status === "in progress")
          ? "in progress"
          : "not started";

        return (
          <RoutineCard
            key={routine.id}
            title={routine.title}
            imageUrl={routine.imageUrl}
            exercises={routine.exercises}
            userStatus={userStatus as 'completed' | 'in progress' | 'not started'}
          />
        );
      })}
    </div>
  );
};

export default RoutinesGrid;

