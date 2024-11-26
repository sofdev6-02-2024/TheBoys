import { FormValues } from "../../routines/create/components";

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

interface DetailedExercise {
  id: string;
  name: string;
  gifUrl: string;
  instructions: string[];
  exerciseId: string;
}

export const createRoutine = async (data: FormValues, url: string, creatorId: string, userId: string) => {
  return await fetch("http://localhost:4444/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      difficultLevel: data.difficultLevel,
      exercises: data.exercises.map((exercise) => exercise.id),
      description: data.description,
      imageUrl: url,
      creatorId,  
      userId: userId || null, 
    }),
  });
};

export const getRoutinesByUser = async (userId: string | null): Promise<Routine[]> => {
  if (!userId) throw new Error("User ID is required");

  const res = await fetch(`http://localhost:4444/routines/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Error fetching routines: ${res.statusText}`);
  }

  const data: Routine[] = await res.json();
  
  return data.map((routine) => ({
    ...routine,
    exercises: routine.exercises.map((exercise) => ({
      ...exercise,
      status: exercise.status as "completed" | "in progress" | "not started",
    })),
  }));
};

export const getExercises = async (): Promise<DetailedExercise[]> => {
  const res = await fetch("http://localhost:4444/exercises");
  if (!res.ok) {
    throw new Error(`Error fetching exercises: ${res.statusText}`);
  }

  const data: DetailedExercise[] = await res.json();
  
  return data.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    gifUrl: exercise.gifUrl,
    instructions: exercise.instructions || [],
    exerciseId: exercise.exerciseId, 
  }));
};

export const updateExercise = async (
  routineId: string | string[], 
  exerciseId: string | undefined, 
  status: "completed" | "in progress" | "not started", 
  reps: number | null
) => {
  const url = `http://localhost:4444/routines/${routineId}`;
  const body = {
    exercises: [
      {
        id: exerciseId,
        repetitions: reps !== null ? reps : 0,
        time: 30,
        status: status,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error updating the exercise");
    }
    return await response.json(); 
  } catch (error) {
    throw new Error("An error occurred while updating the exercise.");
  }
};

