import React, { FC, HTMLAttributes, useState } from "react";
import { Typography } from "../typography/Typography";
import classNames from "classnames";

type CardMainVariant = "primary" | "secondary";

type CardMainState = "default" | "hover" | "focus" | "disabled";

const CardMainVariantClasses: Record<
  CardMainVariant,
  Record<CardMainState, string>
> = {
  primary: {
    default: "btn-primary",
    hover: "btn-primary",
    focus: "btn-primary-focus shadow-grayDark",
    disabled: "btn-primary-disabled",
  },
  secondary: {
    default: "btn-secondary",
    hover: "btn-secondary-hover",
    focus: "btn-secondary-focus shadow-grayDark",
    disabled: "btn-secondary-disabled",
  },
};

export interface CardMainProps extends HTMLAttributes<HTMLElement> {
  children?: string | React.ReactElement;
  className?: string;
  variant: CardMainVariant;
  disabled?: boolean;
  title?: string;
  addClassNames?: string;
  addLeftPos?: string;
  svgHoverFill: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

export const CardMain: FC<CardMainProps> = ({
  children,
  className,
  variant = "primary",
  disabled,
  title,
  addClassNames,
  addLeftPos,
  svgHoverFill,
  onClick,
  ...cardMainProps
}) => {
  const CardMainVariantClassName = CardMainVariantClasses[variant];
  const [opactity, setIsShown] = useState(".3");

  return (
    <div
      {...cardMainProps}
      className={`${addClassNames}`}
      style={{ left: `${addLeftPos}` }}
    >
      <div
        onMouseEnter={() => setIsShown("1")}
        onMouseLeave={() => setIsShown(".3")}
        //className={"card-base"}
        className={classNames("card-base", {
          [classNames(
            CardMainVariantClassName.default,
            CardMainVariantClassName.hover,
            CardMainVariantClassName.focus,
          )]: !disabled,
          [classNames(
            CardMainVariantClassName.disabled,
            "cursor-not-allowed",
          )]: disabled,
        })}
      >
        <div className={`pt-6 text-center `}>
          <Typography
            variant="md"
            customWeight="bold"
            // customColor="text-primary-600 dark:text-primary-300"
            className={`leading-8 tracking-normal to-gray-700 text-2x1 font-FrutigerLTW01`}
          >
            {title}
          </Typography>
          <div className="flex justify-center pt-2">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.66 8c.553 0 1.001.448 1.001 1v5.999l6.013.001a1.001 1.001 0 1 1 0 2H17.66v6a1.001 1.001 0 0 1-2.004 0v-6H9.645a1.001 1.001 0 1 1 0-2h6.012V9c0-.552.449-1 1.002-1z"
                fill="#111"
                fill-rule="evenodd"
                opacity={opactity}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
