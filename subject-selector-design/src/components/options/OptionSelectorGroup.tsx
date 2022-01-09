import React, { FC, useState, useCallback } from "react";
import { optionSelecData } from "../../data";
import { OptionSelector } from "./OptionSelector";
import classNames from "classnames";
import {
  MultiRangeSlider,
  SubHeaderAgeCriteria,
  TextInput3DigActive,
} from "../..";

type OptionSelectorGroupVariant = "Default";

type OptionSelectorGroupState = "default";

const OptionSelectorGroupVariantClasses: Record<
  OptionSelectorGroupVariant,
  Record<OptionSelectorGroupState, string>
> = {
  Default: {
    default: "option-group-age-criteria-place-holder",
  },
};

export interface OptionSelectorGroupProps {
  children?: string | React.ReactElement;
  className?: string;
  variant?: OptionSelectorGroupVariant;
  disabled?: boolean;
  checked?: boolean;
  focus?: boolean;
  showHeaderError: boolean;
}

export const OptionSelectorGroup: FC<OptionSelectorGroupProps> = ({
  className,
  variant = "Default",
  disabled,
  checked = false,
  focus = false,
  showHeaderError = false,
  ...optionSelectorGroupProps
}: OptionSelectorGroupProps) => {
  const OptionSelectorGroupVariantClassName =
    OptionSelectorGroupVariantClasses[variant];

  const [valueTextAge, setValueTextAge] = useState(1);
  const spacerHights = [12, 62, 70];
  const box_nested = [32, 70, 180];
  const initialPosition = [92];

  let sum = initialPosition[0];
  const arrayOpt = optionSelecData.map((item, index) => {
    if (index === 0) {
      sum += spacerHights[index];
    } else if (index === optionSelecData.length - 1) {
      sum += spacerHights[2];
    } else {
      sum += spacerHights[1];
    }

    let boxNested =
      index < optionSelecData.length - 1 ? sum + box_nested[0] : sum;
    console.log("Sum " + sum + " box Nested " + boxNested);
    return {
      id: item.id,
      title: item.title,
      checked: index === 0 ? true : false,
      focus: false,
      addHeight:
        index === 0 ? spacerHights[1] + box_nested[1] : spacerHights[1],
      addTopPos: sum,
      textBoxPos: boxNested,
    };
  });
  console.log(arrayOpt);
  const [groupOption, setGroupOptions] = useState(arrayOpt);

  const middleSpacers = (index: number, limit: number) => {
    if (index < limit - 1) {
      return (
        <figure
          className={"line-copy-4"}
          // style={{ top: `${posIndex}px` }}
        ></figure>
      );
    } else {
      return "";
    }
  };

  const callbackChecked = useCallback((id: number) => {
    console.log("Change Checked : ", id);
    setGroupOptions(
      groupOption.map((opt, index) => {
        if (opt.id === id) {
          opt.checked = true;
          setValueTextAge(1);
          opt.addHeight =
            index < groupOption.length - 1
              ? spacerHights[1] + box_nested[1]
              : box_nested[2];
        } else {
          opt.checked = false;
          opt.addHeight = spacerHights[1];
          setValueTextAge(1);
        }

        return opt;
      }),
    );
  }, []);

  const handleTypeTextAge = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      if (valueTextAge! >= 121) {
        setValueTextAge(120);
      } else if (valueTextAge < 1) {
        setValueTextAge(1);
      }
    }
  };

  return (
    <div
      {...optionSelectorGroupProps}
      className={classNames("", {
        [classNames(OptionSelectorGroupVariantClassName.default)]: !disabled,
      })}
    >
      <div className="select-criteria-place-holder">
        <SubHeaderAgeCriteria showErrorState={showHeaderError} />
        {groupOption &&
          groupOption.map((optSelec, index) => {
            return (
              <div key={`boxOption-${index}`}>
                <OptionSelector
                  id={optSelec.id}
                  addClassNames={""}
                  // addTopPos={optSelec.addTopPos}
                  addHeight={optSelec.addHeight}
                  title={optSelec.title}
                  variant={variant}
                  checked={optSelec.checked}
                  parentCallback={callbackChecked}
                />
                {optSelec.checked && index < groupOption.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: optSelec.textBoxPos,
                      left: "11rem",
                    }}
                  >
                    <TextInput3DigActive
                      id={""}
                      type={"text"}
                      value={valueTextAge}
                      onChange={function (
                        event: React.ChangeEvent<HTMLInputElement>,
                      ): void {
                        setValueTextAge(Number(event.target.value));
                      }}
                      onKeyDown={(_event) => {
                        handleTypeTextAge(_event);
                      }}
                      variant={"Default"}
                    />
                  </div>
                )}
                {optSelec.checked && index === groupOption.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: optSelec.textBoxPos,
                      left: "0",
                    }}
                  >
                    <MultiRangeSlider min={1} max={120} variant={"Inactive"} />
                  </div>
                )}

                {middleSpacers(index, optionSelecData.length)}
              </div>
            );
          })}
      </div>
    </div>
  );
};
