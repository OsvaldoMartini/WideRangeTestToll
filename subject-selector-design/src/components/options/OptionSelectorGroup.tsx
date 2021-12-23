import React, { FC } from "react";
import { optionSelecData} from "../../data";
import { OptionSelector } from "./OptionSelector";
import { IOptionSelectorData } from "../..";

type OptionSelectorGroupVariant = "Default" | "Focus";

export interface OptionSelectorGroupProps {
  children?: string | React.ReactElement;
  className?: string;
  variant: OptionSelectorGroupVariant;
  disabled?: boolean;
}

export const OptionSelectorGroup: FC<OptionSelectorGroupProps> = ({
  children,
  className,
  variant = "Default",
  disabled,
  ...OptionSelectorGroupProps
}) => {
  const spacerDs = [11, 53];
  const spacerHights = [0,62, 62];


  const middleSpacers = (posIndex: number, index: number, limit: number) => {
    if (index > 0 && index < limit) {
      return (
          <figure
            className={"line-copy-4"}
            style={{ top: `${posIndex}px` }}
          >
          </figure>
        
      );
    } else {
      return "";
    }
  };

  var sum = 0;
  return (
    <div {...OptionSelectorGroupProps} className="select-criteria-place-holder">
     {optionSelecData &&
        optionSelecData.map((optSelec: IOptionSelectorData, index: number) => {
          if (index === 0) {
            sum += spacerDs[index];
            console.log(sum, "initial");
          } else {
            sum += spacerHights[2];
            console.log(sum, "Blocks");
          }
          return (
            <>
              <div 
                      onMouseEnter={() => {console.log("ddd");variant = "Focus";}}
                      onMouseLeave={() => variant = "Default"}
              >
                <OptionSelector
                  addClassNames={""}
                  addTopPos={`${sum}px`}
                  key={optSelec.id}
                  title={optSelec.title}
                  variant={variant} 
                  checked={false} 
                  focus={false}
                  />
              </div>
              {middleSpacers((sum - 10), index, optionSelecData.length)}
            </>
          );
        })}
    </div>
  );
};
