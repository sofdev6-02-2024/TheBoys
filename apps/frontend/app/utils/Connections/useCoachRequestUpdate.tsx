import { useState } from "react";
import { TrainerRequest } from "../../types";

export const useCoachRequestUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTrainerRequest = async (id: string, updatedData: Partial<TrainerRequest>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4444/trainer-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to update the trainer request.`);
      }

      const result = await response.json();
      return result;
    } catch (err: string | unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTrainerRequest, isLoading, error };
};
