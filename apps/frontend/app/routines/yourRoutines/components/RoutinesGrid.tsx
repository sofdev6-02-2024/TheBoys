import RoutineCard from "./RoutineCard";

const mockRoutineData = [
    {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "in progress",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      },
      {
        id: "2b30809b-0d12-4786-b633-918240c11b7c",
        title: "Morning Routine",
        description: "Start your day with a boost of energy.",
        creatorId: "1b30809b-0d12-4786-b633-918240c11b7b", 
        difficultLevel: "easy",
        imageUrl: "https://candybargratis.com/wp-content/uploads/2023/08/opera-candy-bar-EL-PATO-LUCAS-kit-imprimible.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        userRutine: [
          {
            id: "3b30809b-0d12-4786-b633-918240c11b7d",
            userId: "5a30809b-0d12-4786-b633-918240c11b8e", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          },
          {
            id: "4c30809b-0d12-4786-b633-918240c11b7f",
            userId: "6a30809b-0d12-4786-b633-918240c11b9f", 
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date(), 
            rutine: [] 
          }
        ],
        exercises: [
          {
            id: "7d30809b-0d12-4786-b633-918240c11b7g",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c",
            exerciseId: "8e30809b-0d12-4786-b633-918240c11b7h", 
            repetitions: 15,
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          },
          {
            id: "9f30809b-0d12-4786-b633-918240c11b7i",
            routineId: "2b30809b-0d12-4786-b633-918240c11b7c", 
            exerciseId: "0a30809b-0d12-4786-b633-918240c11b7j",
            repetitions: 10, 
            time: 120, 
            createdAt: new Date(),
            updatedAt: new Date(), 
            routine: [] 
          }
        ]
      }
];

const RoutinesGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 p-4 bg-[#28292E]">

        {mockRoutineData.map((routine) => {
          const userStatus = routine.userRutine.length > 0 ? routine.userRutine[0].status : 'not started';
  
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
  