import React, { FC } from "react";
import classNames from "classnames";

type TextInput3DigActiveErrorVariant = "Default";

// type TextInput3DigActiveErrorState = "default" | "focus" | "error";

// const TextInput3DigActiveErrorVariantClasses: Record<
//   TextInput3DigActiveErrorVariant,
//   Record<TextInput3DigActiveErrorState, string>
// > = {
//   "Default": {
//     default: "ElementsText-input3-DigitActive",
//     focus: "ElementsText-input3-DigitActive",
//     error: "ElementsText-input3-DigitActive",
//   },
// };

export interface TextInput3DigActiveErrorProps {
  id: string;
  type: "text";
  value?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  errorState: boolean;
  disabled?: boolean;
  autocomplete?: string;
  variant?: TextInput3DigActiveErrorVariant;
}

export const TextInput3DigActiveError: FC<TextInput3DigActiveErrorProps> = ({
  id,
  type,
  value,
  onChange,
  onKeyDown,
  placeholder,
  errorState,
  disabled,
  autocomplete = "off",
}) => {

  return (
    <div>
      <div className={classNames("", {
        "Rectangle_focus": !errorState,
        "Rectangle_error": errorState,
        "bg-gray-50 dark:bg-gray-700": disabled,
      })}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={classNames("ElementsText-input3-text", {
            "": !errorState,
          })}
          disabled={disabled}
          autoComplete={autocomplete}
        />
      </div>
    </div>
  );
};
