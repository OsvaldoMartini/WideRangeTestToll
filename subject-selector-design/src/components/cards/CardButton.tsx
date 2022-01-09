import React, { FC, useState } from "react";
import { Typography } from "../typography/Typography";
import classNames from "classnames";

type CardButtonVariant =
  | "Inactive"
  | "HoverActive"
  | "SearchCriteria"
  | "HoverCriteria";

type CardButtonState =
  | "default"
  | "typography"
  | "typoPosition"
  | "svgPosition";

const CardButtonVariantClasses: Record<
  CardButtonVariant,
  Record<CardButtonState, string>
> = {
  Inactive: {
    default: "bg",
    typography: "card-main-text-typography",
    typoPosition: "card-main-typography-position",
    svgPosition: "card-plus-home-page-position",
  },
  HoverActive: {
    default: "bg",
    typography: "card-main-text-typography",
    typoPosition: "card-main-typography-position",
    svgPosition: "card-plus-home-page-position",
  },
  SearchCriteria: {
    default: "button-search-criteria",
    typography: "button-criteria-text text-white",
    typoPosition: "card-main-typography-position",
    svgPosition: "card-plus-criteria-position",
  },
  HoverCriteria: {
    default: "hover-plus-criteria-button",
    typography: "hover-plus-criteria-text ",
    typoPosition: "card-main-typography-position",
    svgPosition: "card-plus-criteria-position",
  },
};

export interface CardButtonProps {
  children?: string | React.ReactElement;
  className?: string;
  variant: CardButtonVariant;
  disabled?: boolean;
  title?: string;
  addClassNames?: string;
  addLeftPos?: string;
  addTopPos?: string;
  addWidth?: string;
  addPlusPos?: string;
  opacity?: number;
  onClick?: (card: any) => void;
}

export const CardButton: FC<CardButtonProps> = ({
  children,
  className,
  variant = "Inactive",
  disabled,
  title,
  addClassNames,
  addLeftPos,
  addTopPos,
  addWidth,
  addPlusPos,
  opacity,
  ...CardButtonProps
}) => {
  const [hoverButton, setHoverButton] = useState(false);
  const [opactityEvent, setIsShown] = useState("0");

  const CardButtonVariantClassName = hoverButton
    ? CardButtonVariantClasses["HoverCriteria"]
    : CardButtonVariantClasses[variant];

  return (
    <div
      {...CardButtonProps}
      className={`${addClassNames}`}
      style={{ left: `${addLeftPos}`, width: `${addWidth}` }}
    >
      <div
        onMouseEnter={() => {
          setIsShown("1");
          setHoverButton(true);
        }}
        onMouseLeave={() => {
          setIsShown("0");
          setHoverButton(false);
        }}
        className={classNames("", {
          [classNames(CardButtonVariantClassName.default)]: !disabled,
        })}
      >
        <div
          className={classNames("", className, {
            [classNames(CardButtonVariantClassName.typoPosition)]: !disabled,
          })}
        >
          <div
            className={classNames("text-center align-center", className, {})}
          >
            <Typography
              variant="md"
              customWeight="regular"
              className={classNames("", className, {
                [classNames(CardButtonVariantClassName.typography)]: !disabled,
              })}
            >
              {title}
            </Typography>
          </div>
          <div
            style={{ left: `${addPlusPos}px` }}
            className={classNames("", className, {
              [classNames(CardButtonVariantClassName.svgPosition)]: !disabled,
            })}
          >
            {/* <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
              d="M16.66 8c.553 0 1.001.448 1.001 1v5.999l6.013.001a1.001 1.001 0 1 1 0 2H17.66v6a1.001 1.001 0 0 1-2.004 0v-6H9.645a1.001 1.001 0 1 1 0-2h6.012V9c0-.552.449-1 1.002-1z"
              fill="#111"
              fillRule="evenodd"
             
              />
              </svg> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                fillRule="evenodd"
                opacity={variant === "Inactive" ? opacity : opactityEvent}
              >
                <circle
                  fill="#005EB8"
                  fillRule="nonzero"
                  cx="16"
                  cy="16"
                  r="12"
                />
                <path
                  d="M16 11v10m-5-5h10"
                  stroke="#FFF"
                  strokeWidth="2.667"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
