import { FormValues } from "../routines/create/components";

export const createRoutine = async (data: FormValues, url: string) => {
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
    }),
  });

};
