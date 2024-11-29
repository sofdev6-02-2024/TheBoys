import { CurrencyTypes } from "./enums";

export interface InputFieldProps {
  type: string;
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
  disabled?: boolean;
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
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

export interface RoutineActionButtonsProps {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  title: string;
  description: string;
}

export interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  userImage?: string;
  role: "trainer" | "user";
  timezone: string;
  userInformation?: unknown;
}

export interface Certification {
  name: string;
  issuedBy: string;
  issueDate: string;
}

export interface TrainerRequest {
  TrainerRequestId: string;
  userId: string;
  experience: string;
  availability: string;
  specialization: string;
  certifications: Certification[];
}

export interface IntentDto {
  amount: number;
  currency: CurrencyTypes;
}

export interface PaymentItemDto {
  name: string;
  description: string;
  image_url: string;
  amount: number;
  currency: CurrencyTypes;
  client_secret: string;
}

export interface CommentPopupProps {
  type: "Accept" | "Reject";
  request: TrainerRequest | null;
  onClose: () => void;
  onConfirm: (comment: string | null) => void;
}
