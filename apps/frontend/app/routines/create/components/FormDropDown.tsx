/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
  Path,
} from "react-hook-form";

interface Props<T extends Record<string, any>> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  defaultMessage: string;
  options: string[];
  error?: FieldError;
  register: UseFormRegister<T>;
}

function FormDropDown<T extends Record<string, any>>({
  name,
  control,
  label,
  defaultMessage,
  options,
  error,
  register,
}: Props<T>) {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        render={() => (
          <label className="flex flex-col text-xs gap-2">
            {label}
            <select
              className="border border-whiteGray bg-transparent p-2 rounded-md h-12 cursor-pointer"
              {...register(name)}
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
