import { FC } from "react";

type GenericButtonProps = {
  label: string;
  onclick: () => void;
  size: "sm" | "md" | "lg";
  variant: "mainFull" | "base" | "mainEmpty";
};

const GenericButton: FC<GenericButtonProps> = ({
  label,
  onclick,
  size,
  variant,
}) => {
  return (
    <button
      onClick={onclick}
      className={`${
        size === "sm" ? "py-2 px-4" : size === "md" ? "py-4 px-6" : "py-6 px-10"
      } rounded-lg ${
        variant === "mainFull"
          ? "bg-main text-lg font-bold text-white"
          : variant === "mainEmpty"
          ? "text-lg font-bold text-main border border-main"
          : "text-lg font-bold text-white border border-white"
      }`}
    >
      {label}
    </button>
  );
};
export default GenericButton;
