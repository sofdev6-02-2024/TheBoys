export interface InputFieldProps {
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "url"
    | "tel"
    | "search"
    | "color";
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  labelStyle?: string;
  inputStyle?: string;
  containerStyle?: string;
}

export interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  backgroundColor: "primary" | "secondary";
}

export interface IconButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
}

export interface PopupProps {
  handleClose: () => void;
  exercises: Exercise[];
  setRoutineExercises: (exercises: Exercise[]) => void;
}

export interface ExerciseCardProps {
  onClick: () => void;
  exerciseName: string;
  exerciseGif: string;
  isSelected: boolean;
}

export interface ExerciseListItemsProps {
  exerciseName: string;
  onRemove: () => void;
  exerciseGif: string;
  style?: string;
}

export interface Exercise {
  bodyPart: string
  equipment: string
  gifUrl: string
  id: string
  name: string
  target: string
  secondaryMuscles: string[]
  instructions: string[]
}

export interface ExerciseListLayoutProps {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
}

export interface ExerciseControlProps {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  title: string;
  description: string;
}

export interface RoutineActionButtonsProps {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  title: string;
  description: string;
}

export interface RoutineInfoFormProps {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

