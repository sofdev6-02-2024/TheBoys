import { FormValues } from "../../routines/create/components";

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

export const getRoutinesByUser = async (userId: string | null) => {
  if (!userId) throw new Error("User ID is required");

  const res = await fetch(`http://localhost:4444/routines/user/${userId}`);
  if (!res.ok) {
    throw new Error(`Error fetching routines: ${res.statusText}`);
  }

  const data = await res.json();
  return data.map((routine: any) => ({
    ...routine,
    exercises: routine.exercises.map((exercise: any) => ({
      ...exercise,
      status: exercise.status as "completed" | "in progress" | "not started",
    })),
  }));
};

export const getExercises = async () => {
  const res = await fetch("http://localhost:4444/exercises");
  if (!res.ok) {
    throw new Error(`Error fetching exercises: ${res.statusText}`);
  }

  const data = await res.json();
  return data.map((exercise: any) => ({
    id: exercise.id,
    name: exercise.name,
    gifUrl: exercise.gifUrl,
    instructions: exercise.instructions || [],
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

