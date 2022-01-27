import React, { FC, useState } from "react";
import classNames from "classnames";

type TextInput3DigActiveErrorVariant = "Default" | "Focus";

type TextInput3DigActiveErrorState = "default";

const TextInput3DigActiveErrorVariantClasses: Record<
  TextInput3DigActiveErrorVariant,
  Record<TextInput3DigActiveErrorState, string>
> = {
  "Default": {
    default: "ElementsText-input3-DigitActive",
  },
  "Focus": {
    default: "Rectangle_focus",
  },
};

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
  variant: TextInput3DigActiveErrorVariant;
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
  variant = "Default"
}) => {
  const [TextInput3DigActiveErrorVariantClassName, setVariant] = useState(TextInput3DigActiveErrorVariantClasses[variant]);
  const [focusState, setFocusState] = useState(false);

  const boxMouseOutHandler = () => {
    setVariant(TextInput3DigActiveErrorVariantClasses["Default"]);
  };

  const boxOnClickHandler = () => {
    setVariant(TextInput3DigActiveErrorVariantClasses["Focus"]);
    setFocusState(true);
  };


  return (
    <div>
      <div className={classNames("", {
        [classNames(TextInput3DigActiveErrorVariantClassName.default)]: !focusState && !errorState,
        "Rectangle_focus": focusState && !errorState,
        "Rectangle_error": errorState,
        "bg-gray-50 dark:bg-gray-700": disabled,
      })}
        onMouseOut={boxMouseOutHandler}
        onClick={boxOnClickHandler}
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
