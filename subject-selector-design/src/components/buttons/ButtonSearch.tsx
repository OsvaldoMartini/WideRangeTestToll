import React, { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Typography } from "../typography/Typography";

type ButtonSearchVariant = "primary";
type ButtonSearchState = "default";

const ButtonSearchVariantClasses: Record<
  ButtonSearchVariant,
  Record<ButtonSearchState, string>
> = {
  primary: {
    default: "`button-search-text",
  },
};

export interface ButtonSearchProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactElement;
  className?: string;
  variant: ButtonSearchVariant;
  disabled?: boolean;
}

export const ButtonSearch: FC<ButtonSearchProps> = ({
  children,
  className,
  variant = "primary",
  disabled,
  ...buttonProps
}) => {
  const ButtonSearchVariantClassName = ButtonSearchVariantClasses[variant];

  return (
    <button
      {...buttonProps}
      className={classNames("button-search", className, {
        [classNames(ButtonSearchVariantClassName.default)]: !disabled,
      })}
    >
      <div className={`text-center `}>
        <Typography
          variant="md"
          customWeight="bold"
          className={`button-search-text text-white`}
        >
          Search
        </Typography>
      </div>
    </button>
  );
};
