import { FC } from "react";

type InputSearchProps = {
  size: "md" | "lg";
};

const InputSerach: FC<InputSearchProps> = ({ size }) => {
  return (
    <div className="shadow-md">
      <input
        className={`rounded-l-md ${
          size === "lg" ? "py-4 px-4 w-[600px]" : "py-2 px-4"
        }`}
        type="text"
        placeholder="Search for photos"
      />
      <button
        className={`text-sm text-white bg-main font-bold rounded-r-lg shadow-md ${
          size === "lg" ? "py-[19px] px-8" : "py-[11px] px-4"
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default InputSerach;
