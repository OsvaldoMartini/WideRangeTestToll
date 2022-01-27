import React, { FC, useState } from "react";
import { Typography } from "../typography/Typography";
import classNames from "classnames";

type CardMainVariant = "InitialState" | "HoverCriteria" | "SearchCriteria";

type CardMainState = "default" | "typography";

const CardMainVariantClasses: Record<
  CardMainVariant,
  Record<CardMainState, string>
> = {
  InitialState: {
    default: "bg",
    typography: "card-main-text-typography",
  },
  HoverCriteria: {
    default: "bg",
    typography: "card-main-text-typography",
  },
  SearchCriteria: {
    default: "button-search-criteria",
    typography: "button-criteria-text text-white",
  },
};

export interface CardMainProps {
  children?: string | React.ReactElement;
  className?: string;
  variant: CardMainVariant;
  disabled?: boolean;
  title?: string;
  addClassNames?: string;
  addLeftPos?: string;
  addTopPos?: string;
  addWidth?: string;
  opacity?: number;
  onClick?: (card: any) => void;
}

export const CardMain: FC<CardMainProps> = ({
  children,
  className,
  variant = "InitialState",
  disabled,
  title,
  addClassNames,
  addLeftPos,
  addTopPos,
  addWidth,
  opacity,
  ...cardMainProps
}) => {
  const CardMainVariantClassName = CardMainVariantClasses[variant];
  const [opactityEvent, setIsShown] = useState(".3");

  return (
    <div
      {...cardMainProps}
      className={`${addClassNames}`}
      style={{ left: `${addLeftPos}`, width: `${addWidth}` }}
    >
      <div
        onMouseEnter={() => setIsShown("1")}
        onMouseLeave={() => setIsShown(".3")}
        className={classNames("", {
          [classNames(CardMainVariantClassName.default)]: !disabled,
        })}
      >
        <div className="card-main-typography-position">
          <div
            className={classNames("text-center align-center", className, {})}
          >
            <Typography
              variant="md"
              customWeight="regular"
              className={classNames("", className, {
                [classNames(CardMainVariantClassName.typography)]: !disabled,
              })}
            >
              {title}
            </Typography>
          </div>
          <div className="card-plus-home-page-position">
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.66 8c.553 0 1.001.448 1.001 1v5.999l6.013.001a1.001 1.001 0 1 1 0 2H17.66v6a1.001 1.001 0 0 1-2.004 0v-6H9.645a1.001 1.001 0 1 1 0-2h6.012V9c0-.552.449-1 1.002-1z"
                fill="#111"
                fillRule="evenodd"
                opacity={variant === "InitialState" ? opacity : opactityEvent}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
