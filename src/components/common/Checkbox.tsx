import { memo } from "react";
import CheckedIcon from "../icons/CheckedIcon";

const Checkbox = memo(
  ({
    checked,
    handleChange,
    label,
    className,
  }: {
    checked: boolean;
    className?: string;
    handleChange: (option: string) => void;
    label: string;
  }) => {
    return (
      <label
        className={`flex items-center justify-between pt-4 pb-4 ${className}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleChange(label)}
          className="w-5 h-5 hidden"
        />
        <span className="font-medium">{label}</span>
        <div className="w-[23] h-[23] flex items-center justify-center">
          <CheckedIcon
            className={`scale-125 text-regal-orange ${
              checked ? "block" : "hidden"
            }`}
          />
          <div
            className={`w-full h-full  border-1 border-gray-200 rounded-xs ${
              checked ? "hidden" : "block"
            }`}
          ></div>
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
