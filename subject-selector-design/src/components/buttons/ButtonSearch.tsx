import React, { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Typography } from "../..";

type ButtonSearchVariant =
  | "primary"
  | "secondary"
  | "secondaryGray"
  | "tertiary"
  | "tertiaryGray";

type ButtonSearchSize = "sm" | "md" | "lg" | "xl" | "2xl";
type ButtonSearchState = "default" | "hover" | "focus" | "disabled";

const ButtonSearchVariantClasses: Record<
  ButtonSearchVariant,
  Record<ButtonSearchState, string>
> = {
  primary: {
    default: "btn-primary",
    hover: "btn-primary-hover",
    focus: "btn-primary-focus shadow-grayDark",
    disabled: "btn-primary-disabled",
  },
  secondary: {
    default: "btn-secondary",
    hover: "btn-secondary-hover",
    focus: "btn-secondary-focus shadow-grayDark",
    disabled: "btn-secondary-disabled",
  },
  secondaryGray: {
    default: "btn-secondaryGray",
    hover: "btn-secondaryGray-hover",
    focus: "btn-secondaryGray-focus",
    disabled: "btn-secondaryGray-disabled",
  },
  tertiary: {
    default: "btn-tertiary",
    hover: "btn-tertiary-hover",
    focus: "",
    disabled: "btn-tertiary-disabled",
  },
  tertiaryGray: {
    default: "btn-tertiaryGray",
    hover: "btn-tertiaryGray-hover",
    focus: "",
    disabled: "btn-tertiaryGray-disabled",
  },
};

const ButtonSearchSizeClasses: Record<ButtonSearchSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
  "2xl": "btn-2xl",
};

const ButtonSearchIconSizeClasses: Record<ButtonSearchSize, string> = {
  sm: "btn-icon-sm",
  md: "btn-icon-md",
  lg: "btn-icon-lg",
  xl: "btn-icon-xl",
  "2xl": "btn-icon-2xl",
};

export interface ButtonSearchProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactElement;
  className?: string;
  variant: ButtonSearchVariant;
  size?: ButtonSearchSize;
  LeadingIcon?: React.ReactElement;
  TrailingIcon?: React.ReactElement;
  IconOnly?: React.ReactElement;
  disabled?: boolean;
}

export const ButtonSearch: FC<ButtonSearchProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  LeadingIcon,
  TrailingIcon,
  IconOnly,
  disabled,
  ...buttonProps
}) => {
  const ButtonSearchVariantClassName = ButtonSearchVariantClasses[variant];
  const ButtonSearchIconSizeClassName = ButtonSearchIconSizeClasses[size];

  return (
    <button
      {...buttonProps}
      className={classNames("button-search", className, {
        [ButtonSearchSizeClasses[size]]: !IconOnly,
        [classNames(ButtonSearchIconSizeClassName, "justify-center")]: IconOnly,
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
      {LeadingIcon ? (
        <LeadingIcon.type
          {...LeadingIcon.props}
          className={classNames(
            {
              "mr-2": size !== "2xl",
              "mr-3": size === "2xl",
            },
            LeadingIcon.props.className,
          )}
        />
      ) : null}
      <div className={`text-center `}>
        <Typography
          variant="md"
          customWeight="bold"
          className={`button-search-text white_core_ffffff`}
        >
          Search
        </Typography>
      </div>
      {IconOnly ? (
        <IconOnly.type {...IconOnly.props} size={size === "2xl" ? 24 : 20} />
      ) : null}
      {TrailingIcon ? (
        <TrailingIcon.type
          {...TrailingIcon.props}
          className={classNames({
            "ml-2": size !== "2xl",
            "ml-3": size === "2xl",
          })}
        />
      ) : null}
    </button>
  );
};
