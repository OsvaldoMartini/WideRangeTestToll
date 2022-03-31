import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import classNames from "classnames";

type TextInput3DigActiveVariant = "Default" | "NHSNumber";

type TextInput3DigActiveState = "default" | "typography";

const TextInput3DigActiveVariantClasses: Record<
  TextInput3DigActiveVariant,
  Record<TextInput3DigActiveState, string>
> = {
  Default: {
    default: "ElementsText-input3-DigitActive",
    typography: "ElementsText-input3-text",
  },
  NHSNumber: {
    default: "nhs-number-input",
    typography: "nhs-number-input-text",
  },
};

export interface TextInput3DigActiveProps {
  type: "text";
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  errorState?: boolean;
  disabled?: boolean;
  autocomplete?: string;
  variant: TextInput3DigActiveVariant;
}

export const TextInput3DigActive: FC<TextInput3DigActiveProps> = ({
  type,
  value,
  onChange,
  onKeyDown,
  placeholder,
  errorState,
  disabled = false,
  autocomplete = "off",
  variant = "Default",
}) => {
  const TextInput3DigActiveVariantClassName = TextInput3DigActiveVariantClasses[variant];

  // const [focusState, setFocusState] = useState(false);

  // const boxMouseOutHandler = () => {
  //   //  setVariant(TextInput3DigActiveVariantClasses["Default"]);
  //   setFocusState(false);
  // };

  // const boxOnClickHandler = () => {
  //   // setVariant(TextInput3DigActiveVariantClasses["Focus"]);
  //   setFocusState(true);
  // };

  return (
    <div>
      <div
        className={classNames("", {
          [classNames(
            TextInput3DigActiveVariantClassName.default,
          )]: !errorState,
          "Rectangle_focus": !errorState,
          "Rectangle_error": errorState,
          "bg-gray-50 dark:bg-gray-700": disabled,
        })}
      // onMouseOut={boxMouseOutHandler}
      // onClick={boxOnClickHandler}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          pattern="\d"
          disabled={disabled}
          className={classNames("", {
            [classNames(
              TextInput3DigActiveVariantClassName.typography,
            )]: !disabled,
            "bg-gray-50 dark:bg-gray-700": disabled,
          })}
          autoComplete={autocomplete}
        />
      </div>
    </div>
  );
};
