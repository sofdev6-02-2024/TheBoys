import { InputFieldProps } from "../types";

function InputField(props: InputFieldProps) {
  return (
    <p className={`flex flex-col w-full ${props.containerStyle}`}>
      <label className={`flex flex-col text-xs gap-2 ${props.labelStyle}`}>
        {props.labelText}
        <input
          className={`bg-transparent border border-whiteGray rounded-md 
            h-12 p-2 ${props.inputStyle}`}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </label>
    </p>
  );
}

export default InputField;
