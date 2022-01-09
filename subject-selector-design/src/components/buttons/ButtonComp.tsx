import React, { FC } from "react";
import classNames from "classnames";
import { Typography } from "../..";

type ButtonVariant =
  | "ButtonMainPage"
  | "SearchCriteria"
  | "ButtonCancelCriteria"
  | "ButtonCancelAge"
  | "ButtonOkayAge"
  | "ButtonSelectAgeCriteria";

type ButtonState = "default" | "typography";

const ButtonVariantClasses: Record<
  ButtonVariant,
  Record<ButtonState, string>
> = {
  ButtonMainPage: {
    default: "button-search",
    typography: "button-search-text text-white",
  },
  SearchCriteria: {
    default: "button-search-criteria",
    typography: "button-criteria-text text-white",
  },
  ButtonCancelCriteria: {
    default: "button-cancel-criteria",
    typography: "button-cancel-criteria-text",
  },
  ButtonCancelAge: {
    default: "button-cancel-age",
    typography: "button-cancel-age-text",
  },
  ButtonOkayAge: {
    default: "button-okay-age",
    typography: "button-okay-age-text",
  },
  ButtonSelectAgeCriteria: {
    default: "select-age-criteria-selection",
    typography: "select-age-criteria-selection-text",
  },
};

export interface ButtonProps {
  //  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactElement;
  title: string;
  className?: string;
  variant: ButtonVariant;
  disabled?: boolean;
  addLeftPos?: string;
  addWidth?: string;
  addClassNames?: string;
  onClick?: (card: any) => void;
}

export const ButtonComp: FC<ButtonProps> = ({
  children,
  title,
  className,
  variant = "ButtonMainPage",
  disabled,
  addLeftPos,
  addWidth,
  addClassNames,
  ...buttonProps
}) => {
  if (variant === undefined) {
    alert(
      "VARIANT UNDEFINED: SOTY BOOK ERROR \n->IT  OCCURS WHE IS HARD REFRESHED",
    );
  }

  const ButtonVariantClassName = ButtonVariantClasses[variant];

  //const [OptionSelectorVariantClassName, setVariant] = useState(OptionSelectorVariantClasses[variant]);

  return (
    <div
      {...buttonProps}
      // className={`${addClassNames}`}
      style={{ left: `${addLeftPos}`, width: `${addWidth}` }}
    >
      <button
        className={classNames("", className, {
          [classNames(ButtonVariantClassName.default)]: !disabled,
        })}
      >
        <div className={classNames("", className, {})}>
          <Typography
            variant="md"
            customWeight="regular"
            className={classNames("", className, {
              [classNames(ButtonVariantClassName.typography)]: !disabled,
            })}
          >
            {title}
          </Typography>
        </div>
      </button>
    </div>
  );
};
