import React, { FC } from "react";
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
  short?: string;
  category?: string;
  operation?: string;
  className?: string;
  minVal?: number;
  maxVal?: number;
  variant: OptionSelectorVariant;
  checked: boolean;
  disabled?: boolean;
  addClassNames?: string;
  addTopPos?: number;
  addHeight?: number;
  changeOptions: (value: any) => void;
  // parentCallback?: (value: any) => void;
}

export const OptionSelector: FC<OptionSelectorProps> = (props) => {


  const {
    id,
    title,
    category,
    operation,
    short,
    variant = "Default",
    checked,
    disabled,
    addTopPos,
    addHeight,
    changeOptions,
  } = props;


  //const [OptionSelectorVariantClassName, setVariant] = useState(OptionSelectorVariantClasses[variant]);
  const OptionSelectorVariantClassName = OptionSelectorVariantClasses[variant];

  // const [OptionSelectorProps, setOptionSelectorProps] = useState(optionSelectorProps);
  // console.log("OptionSelectorProps", { ...OptionSelectorProps }.addClassNames);

  // const boxMouseOverHandler = () => {
  //   setVariant(OptionSelectorVariantClasses["Focus"]);
  // };

  // const boxMouseOutHandler = () => {
  //   setVariant(OptionSelectorVariantClasses["Default"]);
  // };

  // useEffect(() => {

  //   console.log("always OPTION sELECTOR 2");

  //   //parentCallback!({ operation: operation, id: id })
  //   // localStorage.setItem("Between-min", JSON.stringify(minVal));
  //   // localStorage.setItem("Between-max", JSON.stringify(maxVal));
  // }, []);


  ////console.log(variant);
  return (
    <div className={classNames("", {
      [classNames(OptionSelectorVariantClassName.position)]: !disabled,
    })}
      style={{ height: `${addHeight}px` }}
      key={`${id}`}
      data-uniqueid={addTopPos}
      // onClick={() => { parentCallback!({ title: title, short: short, operation: operation, id: id }) }}
      onClick={() => changeOptions({ id: id, title: title, short: short, operation: operation, category: category })}
    >
      <div div-checked={String(checked)} className={classNames("eclipse-yellow-black", {
        [classNames(OptionSelectorVariantClassName.default)]: !disabled,

      })}
        // onMouseOver={boxMouseOverHandler}
        // onMouseOut={boxMouseOutHandler}
        data-uniqueid={`option-${addTopPos}`}
      >
        {checked && (<OvalOption key={`oval-${addTopPos}`} />)}
      </div>
      <div
        className={classNames("", {
          [classNames(OptionSelectorVariantClassName.labelPosition)]: !disabled,
        })}
        // onMouseOver={boxMouseOverHandler}
        // onMouseOut={boxMouseOutHandler}
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


