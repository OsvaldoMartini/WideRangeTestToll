import React, {FC} from "react";
import classNames from "classnames";
import { OvalOption } from "./OvalOption";

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
    className?: string;
    variant: OptionSelectorVariant;
    checked: boolean;
    disabled?: boolean;
    focus:boolean;
    addClassNames?: string;
  }

 export const OptionSelector: FC<OptionSelectorProps> = ({
        children,
        className,
        variant = "Default",
        checked = false,
        disabled,
        addClassNames,
        ...optionSelectorProps
      }) => {
        const OptionSelectorVariantClassName = OptionSelectorVariantClasses[variant];

    return (
        <div {...optionSelectorProps} className="OptionSelector-position">
            <div  className={classNames("", {
                [classNames(OptionSelectorVariantClassName.default)]: !disabled, 
                
             })}
              
            >
            {checked && (<OvalOption/>)}
          </div>
      
        </div>
    )
}
