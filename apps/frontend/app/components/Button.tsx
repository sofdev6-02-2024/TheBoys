import { ButtonProps, IconButtonProps } from "../types";

function Button(props: ButtonProps) {
  return (
    <button
      className={`bg-${props.backgroundColor}-default hover:bg-${props.backgroundColor}-hover
      active:bg-${props.backgroundColor}-active text-white rounded-md px-6 py-2 text-xl
      w-fit h-fit ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      title="button"
    >
      {props.children}
    </button>
  );
}

function IconButton(props: IconButtonProps) {
  return (
    <button
      className={`bg-primary-active hover:bg-primary-hover
      active:bg-primary-default text-white rounded-md px-2 py-2 text-xl
      w-fit h-fit ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      title="icon-button"
    >
      {props.children}
    </button>
  );
}

export default Button;
export { IconButton };
