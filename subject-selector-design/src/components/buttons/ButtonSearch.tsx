import React, { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Typography } from "../typography/Typography";

type ButtonSearchVariant = "primary";
type ButtonSearchSize = "sm" | "md" | "lg" | "xl" | "2xl";
type ButtonSearchState = "default" | "hover" | "focus" | "disabled";

const ButtonSearchVariantClasses: Record<
  ButtonSearchVariant,
  Record<ButtonSearchState, string>
> = {
  primary: {
    default: "button-search",
    hover: "button-search",
    focus: "button-search",
    disabled: "button-search",
  },
};

export interface ButtonSearchProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactElement;
  className?: string;
  variant: ButtonSearchVariant;
  size?: ButtonSearchSize;
  disabled?: boolean;
}

export const ButtonSearch: FC<ButtonSearchProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...buttonProps
}) => {
  const ButtonSearchVariantClassName = ButtonSearchVariantClasses[variant];

  return (
    <button
      {...buttonProps}
      className={classNames("button-search", className, {
        [classNames(
          ButtonSearchVariantClassName.default,
          ButtonSearchVariantClassName.hover,
          ButtonSearchVariantClassName.focus,
        )]: !disabled,
        [classNames(
          ButtonSearchVariantClassName.disabled,
          "cursor-not-allowed",
        )]: disabled,
      })}
    >
      <div className={`text-center `}>
        <Typography
          variant="md"
          customWeight="bold"
          className={`button-search-text`}
        >
          Search
        </Typography>
      </div>
    </button>
  );
};
