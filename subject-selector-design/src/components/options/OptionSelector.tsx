import React, {FC, useState } from "react";
import classNames from "classnames";
import { OvalOption } from "./OvalOption";
import { Typography } from "../..";

type OptionSelectorVariant = "Default" | "Focus";

type OptionSelectorState = "default";

const OptionSelectorVariantClasses: Record<
  OptionSelectorVariant,
  Record<OptionSelectorState, string>
> = {
  "Default": {
    default: "eclipse-black",
  },
  "Focus": {
    default: "eclipse-yellow-black",
  },
  
};

export interface OptionSelectorProps {
    children?: string | React.ReactElement;
    title?:string;
    className?: string;
    variant: OptionSelectorVariant;
    checked: boolean;
    disabled?: boolean;
    focus:boolean;
    addClassNames?: string;
    addTopPos?: string;
  }

 export const OptionSelector: FC<OptionSelectorProps> = ({
        children,
        title,
        className,
        variant = "Focus",
        checked = false,
        disabled,
        addClassNames,
        addTopPos,
        focus,
        ...optionSelectorProps
      }) => {
        const [OptionSelectorVariantClassName, setVariant] = useState(OptionSelectorVariantClasses[variant]);
        const [showOval, setShowOval] = useState(false);
        const boxMouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
          const box_div: HTMLDivElement = event.currentTarget; // eslnt-disable-line
          setVariant(OptionSelectorVariantClasses["Focus"]);
        };
    
        const boxMouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
          // eslint-disable-next-line
          const box_div: HTMLDivElement = event.currentTarget;
          setVariant(OptionSelectorVariantClasses["Default"]);
        };

        
        const boxMouseClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
          // eslint-disable-next-line
          const box_div: HTMLDivElement = event.currentTarget;
          setShowOval(!showOval)
          checked = true;
        };

    return (
        <div {...optionSelectorProps} 
        className={`option-selector-position `}
        style={{ top: `${addTopPos}` }}
        >
        <div className={classNames("", {
                [classNames(OptionSelectorVariantClassName.default)]: !disabled, 
              })}
              onMouseOver={boxMouseOverHandler}
              onMouseOut={boxMouseOutHandler}
              onClick={boxMouseClickHandler}
            >
             {checked || showOval && (<OvalOption/>)}
          </div>
          <div className="option-label-position"
           onMouseOver={boxMouseOverHandler}
           onMouseOut={boxMouseOutHandler}
           onClick={boxMouseClickHandler}
          >
          <Typography
            variant="md"
            className={`place-holder-option-label `}
          >
            {title}
          </Typography>
          </div>
      
        </div>
    )
}
