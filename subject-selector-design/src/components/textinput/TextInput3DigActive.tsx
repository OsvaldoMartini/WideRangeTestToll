import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import classNames from "classnames";

export interface TextInput3DigActiveProps {
  id: string;
  type: "text";
  value?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  autocomplete?:string;
}

export const TextInput3DigActive: FC<TextInput3DigActiveProps> = ({
  id,
  type,
  value,
  onChange,
  onKeyDown,
  placeholder,
  disabled=false,
  autocomplete="off"
}) => {

 return (
    <>
      <div className={classNames("", {
            "ElementsText-input3-DigitActive": !disabled,
            "bg-gray-50 dark:bg-gray-700": disabled,
          })} >
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          pattern="\d"
          disabled={disabled}
          className={classNames("", {
            "ElementsText-input3-text": !disabled,
            "bg-gray-50 dark:bg-gray-700": disabled,
          })}
          autoComplete={autocomplete}

        />
      </div>
    </>
  );
};
