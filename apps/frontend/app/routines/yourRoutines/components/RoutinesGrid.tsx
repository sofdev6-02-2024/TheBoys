"use client";

import React, { useEffect, useState } from "react";
import RoutineCard from "./RoutineCard";
import { getRoutinesByUser } from "@/app/utils/Connections/connectionsRoutine";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";

interface Exercise {
  id: string;
  routineId: string;
  exerciseId: string;
  repetitions: number | null;
  time: number | null;
  status: "completed" | "in progress" | "not started";
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
  const { user, isLoading } = useKeycloakProfile(); 

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id); 
    }
  }, [user]); 

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        if (userId) {
          const data = await getRoutinesByUser(userId);
          setRoutines(data);
        }
      } catch (error) {
        console.error("Error fetching routines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [userId]);

  if (loading) {
    return <div className="text-white text-center">Loading routines...</div>;
  }

  if (routines.length === 0) {
    return <div className="text-white text-center">No routines found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-4 bg-[#28292E]">
      {routines.map((routine) => {
        const userStatus: "completed" | "in progress" | "not started" =
          routine.exercises.every((ex) => ex.status === "completed")
            ? "completed"
            : routine.exercises.some((ex) => ex.status === "in progress")
            ? "in progress"
            : "not started";

        return (
          <RoutineCard
            key={routine.id}
            title={routine.title}
            imageUrl={routine.imageUrl}
            exercises={routine.exercises}
            userStatus={userStatus}
            id={routine.id}
          />
        );
      })}
    </div>
  );
};

export default RoutinesGrid;
