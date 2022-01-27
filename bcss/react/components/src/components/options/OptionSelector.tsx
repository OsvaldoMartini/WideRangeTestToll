import React, { FC, useState } from "react";
import classNames from "classnames";
import { OvalOption } from "./OvalOption";
import { Typography } from "../typography/Typography";


import "../styles/styles.scss";

type OptionSelectorVariant = "Default" | "Focus";

type OptionSelectorState = "default" | "position" | "labelPosition" | "typographyText"

const OptionSelectorVariantClasses: Record<
  OptionSelectorVariant,
  Record<OptionSelectorState, string>
> = {
  "Default": {
    default: "eclipse-black",
    position: "option-selector-position",
    labelPosition: "option-label-position",
    typographyText: "option-typography-text"
  },
  "Focus": {
    default: "eclipse-yellow-black",
    position: "option-selector-position",
    labelPosition: "option-label-position",
    typographyText: "option-typography-text"
  },
};

export interface OptionSelectorProps {
  id: number;
  title?: string;
  operation?: string;
  className?: string;
  variant: OptionSelectorVariant;
  checked: boolean;
  disabled?: boolean;
  addClassNames?: string;
  addTopPos?: number;
  addHeight?: number;
  parentCallback?: (value: any) => void;
}

export const OptionSelector: FC<OptionSelectorProps> = ({
  id,
  title,
  operation,
  variant = "Default",
  checked,
  disabled,
  addTopPos,
  addHeight,
  parentCallback
}) => {
  const [OptionSelectorVariantClassName, setVariant] = useState(OptionSelectorVariantClasses[variant]);

  const boxMouseOverHandler = () => {
    setVariant(OptionSelectorVariantClasses["Focus"]);
  };

  const boxMouseOutHandler = () => {
    setVariant(OptionSelectorVariantClasses["Default"]);
  };

  // useEffect(() => {

  //   console.log("always OPTION sELECTOR 2");

  //   //parentCallback!({ operation: operation, id: id })
  //   // localStorage.setItem("Between-min", JSON.stringify(minVal));
  //   // localStorage.setItem("Between-max", JSON.stringify(maxVal));
  // }, []);


  ////console.log(variant);
  return (
    <div
      className={classNames("", {
        [classNames(OptionSelectorVariantClassName.position)]: !disabled,
      })}
      style={{ height: `${addHeight}px` }}
      key={`${id}`}
      data-uniqueid={addTopPos}
      onClick={() => { parentCallback!({ title: title, operation: operation, id: id }) }}
    >
      <div className={classNames("", {
        [classNames(OptionSelectorVariantClassName.default)]: !disabled,
      })}
        onMouseOver={boxMouseOverHandler}
        onMouseOut={boxMouseOutHandler}
        data-uniqueid={`option-${addTopPos}`}
      >
        {checked && (<OvalOption key={`oval-${addTopPos}`} />)}
      </div>
      <div
        className={classNames("", {
          [classNames(OptionSelectorVariantClassName.labelPosition)]: !disabled,
        })}
        onMouseOver={boxMouseOverHandler}
        onMouseOut={boxMouseOutHandler}
        data-uniqueid={`label-${addTopPos}`}
      >
        <Typography
          variant="md"
          className={classNames("", {
            [classNames(OptionSelectorVariantClassName.typographyText)]: !disabled,
          })}
        >
          {title}
        </Typography>
      </div>

    </div>
  )
}


