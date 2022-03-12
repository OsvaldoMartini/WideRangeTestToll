import React, { FC } from "react";
import classNames from "classnames";
import { Typography } from "../typography/Typography";

type ButtonSecondaryVariant = "Enabled" | "Disabled";
type ButtonSecondaryState = "default";

const ButtonSecondaryVariantClasses: Record<
  ButtonSecondaryVariant,
  Record<ButtonSecondaryState, string>
> = {
  "Enabled": {
    default: "button-add-criterion",
  },
  "Disabled": {
    default: "button-add-criterion-disabled",
  }
};

export interface ButtonSecondaryProps {
  className?: string;
  variant: ButtonSecondaryVariant;
  title?: string;
}

export const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  className,
  title,
  variant = "Disabled",
  ...buttonProps
}) => {
  const buttonSecondaryVariantClassName = ButtonSecondaryVariantClasses[variant];

  return (
    <div
      {...buttonProps}
      className={classNames(buttonSecondaryVariantClassName.default)}
    >
      <div className={`text-center`}>
        <Typography
          variant="md"
          customWeight="regular"
          className={`button-add-criterion-text`}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};
