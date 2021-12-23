import React, { FC, KeyboardEvent, ChangeEvent } from "react";
import classNames from "classnames";

export interface TextInput3DigActiveErrorProps {
  id: string;
  type: "text";
  value?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  errorState: boolean;
  disabled?: boolean;
  autocomplete?: string;
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
  autocomplete="off"
}) => {
  return (
    <>
          <div className={classNames("", {
            "ElementsText-input3-DigitActive" : !errorState,
            "Rectangle_error": errorState,
             "bg-gray-50 dark:bg-gray-700": disabled,
          })} > 
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
    </>
  );
};
