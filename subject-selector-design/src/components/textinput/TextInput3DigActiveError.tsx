import React, { FC } from "react";
import classNames from "classnames";

export interface TextInput3DigActiveErrorProps {
  type: "text";
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
}

export const TextInput3DigActiveError: FC<TextInput3DigActiveErrorProps> = ({
  type,
  value,
  handleChange,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <>
      <div className={""}>
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={classNames("", {
            "Rectangle_error ElementsText-input3-DigitActive": error,
            "ElementsText-input3-DigitActive": !error,
            // "rounded-lg": !error,
            "ElementsText-input3-DigitActive border-gray-300 dark:border-gray-500 focus:ring-4 focus:border-primary-300 dark:focus:border-gray-100 focus:ring-primary-100 dark:focus:ring-gray-100 dark:focus:ring-opacity-20": !error,
            // "ElementsText-input3-DigitActive-error border-error-300 focus:ring-4 focus:border-error-300 focus:ring-error-100": error,
            "ElementsText-input3-DigitActive bg-white dark:bg-gray-800": !disabled,
            "bg-gray-50 dark:bg-gray-700": disabled,
          })}
          disabled={disabled}
        />
      </div>
    </>
  );
};
