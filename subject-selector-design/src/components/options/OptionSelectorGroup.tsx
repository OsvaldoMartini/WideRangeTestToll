import React, { FC, useEffect, useState } from "react";
import { optionSelecData } from "../../data";
import { OptionSelector } from "./OptionSelector";
import classNames from "classnames";
import { SubHeaderAgeCriteria } from "../navigation/SubHeaderAgeCriteria";
import { MultiRangeSlider } from "../slider/MultiRangeSlider/MultiRangeSlider";
import { TextInput3DigActive } from "../textinput/TextInput3DigActive";

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
  valueAgeInit: any;
  optionsInit: any;
  changeOptions: (value: any) => void;
  changeValuesAge: (value: any) => void;
  // parentCallback?: (values: any) => void;
}

export const OptionSelectorGroup: FC<OptionSelectorGroupProps> = (props) => {

  const {
    variant = "Default",
    disabled,
    valueAgeInit,
    optionsInit,
    changeOptions,
    changeValuesAge,
  } = props;

  const [optionSelected, setOptionSelected] = useState(optionsInit);
  const [valuesAge, setValuesAge] = useState(valueAgeInit);
  const [typingText, setTypingText] = useState(false);

  const OptionSelectorGroupVariantClassName =
    OptionSelectorGroupVariantClasses[variant];


  const [subHeadeError, setSubHeadeError] = useState(false);


  const [valueTextAge, setValueTextAge] = useState(valuesAge.minAge);
  const [operationSelected, setOperationSelected] = useState<any>(optionSelecData[0]);
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
    //console.log("Sum " + sum + " box Nested " + boxNested);
    return {
      id: item.id,
      title: item.title,
      operation: item.operation,
      short: item.short,
      checked: index === 0 ? true : false,
      minVal: valuesAge.minAge,
      maxVal: valuesAge.maxAge,
      focus: false,
      addHeight:
        index === 0 ? spacerHights[1] + box_nested[1] : spacerHights[1],
      addTopPos: sum,
      textBoxPos: boxNested,
    };
  });
  console.log("arrayOpt", arrayOpt);
  const [groupOption, setGroupOptions] = useState(arrayOpt);
  // console.log("setGroupOptions : ", arrayOpt);

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


  const handleTypeTextAge = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //console.log(e.key);
    if (e.key === "Enter") {
      changeValuesAge({ ...valuesAge, minAge: valueTextAge });
    }
  };


  useEffect(() => {
    if (valuesAge.maxAge >= 121) {
      setSubHeadeError(true);
    } else {
      setSubHeadeError(false);
    }
  }, [valuesAge])


  useEffect(() => {
    //if (!typingText) {
    if (optionSelected.operation !== "between") {
      if (valuesAge.minAge === 0) {
        changeValuesAge({ ...valuesAge, minAge: 1 });
        setValueTextAge(1);
      } else {
        changeValuesAge(valuesAge);
        setValueTextAge(valuesAge.minAge);
      }
    }

    console.log("useEffect(() OptionGroup:", valuesAge.minVal + " - " + valuesAge.maxVal)
    setGroupOptions(
      groupOption.map((opt, index) => {
        if (opt.id === optionSelected.id) {
          opt.checked = true;
          //setValueTextAge(1);
          opt.addHeight =
            index < groupOption.length - 1
              ? spacerHights[1] + box_nested[1]
              : box_nested[2];
        } else {
          opt.checked = false;
          opt.addHeight = spacerHights[1];
          //setValueTextAge(1);
        }

        return opt;
      }),
    );
    // } else {
    //   setTypingText(false);
    //   console.log("seet", typingText)
    // }
  }, [optionSelected])

  return (
    <div
      className={classNames("", {
        [classNames(OptionSelectorGroupVariantClassName.default)]: !disabled,
      })}
    >
      <div className="select-criteria-place-holder">
        <SubHeaderAgeCriteria showErrorState={subHeadeError} />
        {groupOption &&
          groupOption.map((optSelec, index) => {
            return (
              <div key={`boxOption-${index}`}>
                <OptionSelector
                  id={optSelec.id}
                  title={optSelec.title}
                  short={optSelec.short}
                  operation={optSelec.operation}
                  minVal={optSelec.minVal}
                  maxVal={optSelec.maxVal}
                  // addTopPos={optSelec.addTopPos}
                  addHeight={optSelec.addHeight}
                  variant={variant}
                  checked={optSelec.checked}
                  changeOptions={(optionSelected: any) => {
                    setOptionSelected(optionSelected)
                    changeOptions(optionSelected);
                  }}
                //onClick={(optionSelected: any) => setOperationSelected(optionSelected)}
                //
                //onClick={selectOption => setOperationSelected(selectOption)}
                // parentCallback={callbackChecked}
                />
                {optSelec.checked && index < groupOption.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: optSelec.textBoxPos,
                      left: "176px",
                    }}
                  >
                    <TextInput3DigActive
                      key={optSelec.id}
                      type={"text"}
                      value={valueTextAge}
                      onChange={function (
                        event: React.ChangeEvent<HTMLInputElement>,
                      ): void {
                        let valueDigited = Number(event.target.value);
                        if (valueDigited! >= 121) {
                          valueDigited = 120;
                        } else if (Number(event.target.value) < 0) {
                          valueDigited = 0;
                        }
                        setTypingText(true);
                        setValueTextAge(valueDigited);
                        //setOptionSelected({ id: operationSelected.id, title: operationSelected.title, short: operationSelected.short, operation: operationSelected.operation, minVal: valueDigited, maxVal: -9999 });
                        changeValuesAge({ ...valuesAge, minAge: valueDigited });

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
                      left: "-20px",
                    }}
                  >
                    <MultiRangeSlider
                      id={optSelec.id}
                      title={optSelec.title}
                      short={optSelec.short}
                      operation={optSelec.operation}
                      minLeft={0}
                      maxLeft={119}
                      minRight={1}
                      maxRight={120}
                      variant={"Inactive"}
                      valuesAge={valuesAge || { minAge: 0, maxAge: 120 }}
                      changeValuesAge={(valuesAge: any) => {
                        setValuesAge(valuesAge);
                        changeValuesAge({ minAge: valuesAge.minAge, maxAge: valuesAge.maxAge });
                      }}
                    // parentCallback={valuesOptionsState}
                    />
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
