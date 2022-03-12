import React, { FC } from "react";
import classNames from "classnames";
import { Typography } from "../typography/Typography";

type ButtonVariant =
  | "ButtonMainPage"
  | "SearchCriteria"
  | "ButtonCancelCriteria"
  | "ButtonCancelAge"
  | "ButtonOkayAge"
  | "ButtonSelectAgeCriteria"
  | "ButtonAddCriterion"
  | "ButtonCancelSearch";

type ButtonState = "default" | "textPosition" | "typography";

const ButtonVariantClasses: Record<
  ButtonVariant,
  Record<ButtonState, string>
> = {
  ButtonMainPage: {
    default: "button-search-disabled",
    textPosition: "button-main-search-text-position",
    typography: "button-search-text text-white",
  },
  SearchCriteria: {
    default: "button-search-criteria",
    textPosition: "button-criteria-text-position",
    typography: "button-criteria-text text-white",
  },
  ButtonCancelCriteria: {
    default: "button-cancel-criteria",
    textPosition: "", //button-cancel-criteria-text-position
    typography: "button-cancel-criteria-text",
  },
  ButtonCancelAge: {
    default: "button-cancel-age",
    textPosition: "button-cancel-age-text-position",
    typography: "button-cancel-age-text",
  },
  ButtonOkayAge: {
    default: "button-okay-age",
    textPosition: "button-okay-age-text-position",
    typography: "button-okay-age-text",
  },
  ButtonSelectAgeCriteria: {
    default: "select-age-criteria-selection",
    textPosition: "", //button-subject-age-text-position
    typography: "select-age-criteria-selection-text",
  },
  ButtonAddCriterion: {
    default: "button-add-criterion",
    textPosition: "button-add-criterion-text-position",
    typography: "button-add-criterion-text",
  },
  ButtonCancelSearch: {
    default: "button-search",
    textPosition: "button-main-cancel-text-position",
    typography: "button-search-text text-white",
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
          // "button-search": !disabled && variant === "ButtonMainPage",
          "button-search": !disabled && (variant === "ButtonMainPage" || variant === "ButtonCancelSearch"),
          "button-search-disabled": disabled && variant === "ButtonMainPage",
          "button-add-criterion-disabled": disabled && variant === "ButtonAddCriterion",
          "button-add-criterion": !disabled && variant === "ButtonAddCriterion",
          "button-okay-age": variant === "ButtonOkayAge",
        })}
        disabled={disabled}
      >
        <div className={ButtonVariantClassName.textPosition}>
          <Typography
            variant="md"
            customWeight="regular"
            className={ButtonVariantClassName.typography}
          >
            {title}
          </Typography>
        </div>
      </button>
    </div>
  );
};