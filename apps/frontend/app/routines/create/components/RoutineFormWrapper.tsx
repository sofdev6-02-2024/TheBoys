"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import FormDropDown from "./FormDropDown";
import Button from "@/app/components/Button";
import { FaDumbbell } from "react-icons/fa";
import { useState, useEffect } from "react";
import ExercisesPopup from "./ExercisesPopup";
import { Exercise } from "@/app/types";
import ExerciseListLayout from "./ExerciseListLayout";
import { uploadImage } from "@/app/utils/cloudinary";
import { createRoutine } from "@/app/utils/Connections/connectionsRoutine";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";
import { toast } from "sonner";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  title: z.string({ message: "Name is required" }).min(1, "Name is required"),
  description: z
    .string({ message: "Description is required" })
    .min(1, "Description is required"),
  difficultLevel: z.enum(["easy", "medium", "hard"], {
    message: "Select an option",
  }),
  exercises: z.array(
    z.object({
      bodyPart: z.string(),
      equipment: z.string(),
      gifUrl: z.string(),
      id: z.string(),
      name: z.string(),
      target: z.string(),
      secondaryMuscles: z.array(z.string()),
      instructions: z.array(z.string()),
    }),
  ),
  image: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type FormValues = z.infer<typeof schema>;

function RoutineFormWrapper() {
  const { user } = useKeycloakProfile();
  const [showPopup, setShowPopup] = useState(false);
  const [exercisesList, setExercises] = useState([] as Exercise[]);
  

  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    description: "",
    difficultLevel: "easy",
    image: new File([], ""), 
    exercises: exercisesList,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: formValues, 
  });


  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      exercises: exercisesList,
    }));

    setValue("exercises", exercisesList);
  }, [exercisesList, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const url = await uploadImage(data.image);
    if (!url) toast.error("There was an error uploading the image");
    if (user && user.id) {
      const res = await createRoutine(data, url ?? "", user.id);
      if (res.ok) {
        toast.success("Routine created successfully");
      } else {
        toast.error("Error creating routine");
      }
    } else {
      toast.error("User ID is missing");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 sm:w-2/3 w-full sm:p-2 p-6 place-self-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        name="title"
        control={control}
        label="Title"
        type="text"
        error={errors.title}
      />
      <FormInput
        name="description"
        control={control}
        label="Description"
        type="text"
        error={errors.description}
      />
      <FormDropDown
        name="difficultLevel"
        control={control}
        label="Difficult Level"
        defaultMessage="Select an Option"
        options={["easy", "medium", "hard"]}
        error={errors.difficultLevel}
        register={register}
      />
      <FormInput
        name="image"
        control={control}
        label="Presentation Image"
        type="file"
        error={errors.image}
        accept="image/*"
      />
      <ExerciseListLayout
        exercises={exercisesList}
        setExercises={setExercises}
      />
      <section
        className="flex md:flex-row flex-col gap-y-4 md:justify-between
      items-center sm-pb-2 pb-16"
      >
        <Button
          type="button"
          backgroundColor="primary"
          className="flex gap-3 border border-whiteGray items-center"
          onClick={() => setShowPopup(!showPopup)}
        >
          <p>Add new exercises</p>
          <FaDumbbell className="h-6 w-6" />
        </Button>
        <Button type="submit" backgroundColor="secondary">
          <p>Finish</p>
        </Button>
      </section>
      {showPopup && (
        <ExercisesPopup
          handleClose={() => setShowPopup(false)}
          setRoutineExercises={setExercises}
          exercises={exercisesList}
        />
      )}
    </form>
  );
}

export default RoutineFormWrapper;
