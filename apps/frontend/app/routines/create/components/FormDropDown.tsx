/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "./RoutineFormWrapper";

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  defaultMessage: string;
  options: string[];
  error?: FieldError;
  register: UseFormRegister<FormValues>;
}

function FormDropDown({
  name,
  control,
  label,
  defaultMessage,
  options,
  error,
  register,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        render={() => (
          <label className="flex flex-col text-xs gap-2">
            {label}
            <select
              className={`border border-whiteGray bg-transparent p-2 rounded-md h-12 cursor-pointer`}
              {...register("difficultLevel")}
              defaultValue="Select an Option"
            >
              <option disabled className="hidden">
                {defaultMessage}
              </option>
              {options.map((option, i) => (
                <option
                  key={i}
                  value={option.toLowerCase()}
                  className="text-black"
                >
                  {option}
                </option>
              ))}
            </select>
          </label>
        )}
      />
      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  );
}

export default FormDropDown;
