const mockRoutineData = {
    id: "2b30809b-0d12-4786-b633-918240c11b7c", // UUID generado aleatoriamente
    title: "Morning Routine",
    creatorId: "1a2b3c4d-0e12-4786-b633-918240c11b7c", // UUID del creador
    description: "A simple and effective routine to start your day.",
    difficultLevel: "medium", // easy, medium, or hard
    imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png", // URL de la imagen
    createdAt: new Date("2024-11-01T00:00:00Z"),
    updatedAt: new Date("2024-11-01T01:00:00Z"),
    deletedAt: null,
    userRutine: [
      {
        userId: "2b30809b-0d12-4786-b633-918240c11b7c",
        routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
        status: "completed", // Example status, could be "completed", "in-progress", etc.
      },
    ],
    exercises: [
      "2b30809b-0d12-4786-b633-918240c11b7c", // UUID de los ejercicios relacionados
      "3a4b5c6d-1f23-4786-b633-918240c11b8d", // Otro UUID de ejercicio
    ],
  };
  
  console.log(mockRoutineData);
  