import React, { FC, useState } from "react";
import {} from "react";
import { Typography } from "../typography/Typography";
import classNames from "classnames";

type CardMainVariant = "primary" | "secondary";

type CardMainState = "default";

const CardMainVariantClasses: Record<
  CardMainVariant,
  Record<CardMainState, string>
> = {
  primary: {
    default: "bg",
  },
  secondary: {
    default: "Place-Holder",
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
}

export const CardMain: FC<CardMainProps> = ({
  children,
  className,
  variant = "primary",
  disabled,
  title,
  addClassNames,
  addLeftPos,
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
        className={classNames("bg ", {
          [classNames(CardMainVariantClassName.default)]: !disabled,
        })}
      >
        <div style={{ position: "relative" }}>
          <Typography
            variant="md"
            customWeight="bold"
            className={`Place-Holder `}
          >
            {title}
          </Typography>
          <div className="plus-postion">
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
