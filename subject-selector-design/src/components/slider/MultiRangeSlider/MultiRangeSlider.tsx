import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Lottie from "react-lottie";

/* tslint:disable-next-line:max-line-length */
import animationData from "./SliderErrorEllipse_12px.json";
import { TextInput3DigActive } from "../../textinput/TextInput3DigActive";
import { TextInput3DigActiveError } from "../../textinput/TextInput3DigActiveError";

type MultiRangeSliderVariant = "Inactive" | "Active";

type MultiRangeSliderState = "default";

const MultiRangeSliderVariantClasses: Record<
  MultiRangeSliderVariant,
  Record<MultiRangeSliderState, string>
> = {
  Inactive: {
    default: "componentSlider-Typed",
  },
  Active: {
    default: "componentSlider-Typed",
  },
};

export interface MultiRangeSliderProps {
  children?: string | React.ReactElement;
  id?: number;
  title?: string;
  short?: string;
  operation?: string;
  category?: string;
  minLeft: number;
  maxLeft: number;
  minRight: number;
  maxRight: number;
  variant: MultiRangeSliderVariant;
  disabled?: boolean;
  valuesAge?: any;
  changeValuesAge?: (value: any) => void;
  //parentCallback?: (values: any) => void;
}

export const MultiRangeSlider: FC<MultiRangeSliderProps> = (props) => {
  const {
    minLeft,
    maxLeft,
    minRight,
    maxRight,
    variant = "Active",
    valuesAge,
    changeValuesAge,
    disabled } = props;

  //const [state, dispatch] = useReducer(optionReducer, { buttonSubmit: true });

  const MultiRangeSliderVariantClassName =
    MultiRangeSliderVariantClasses[variant];
  const [stStopped, setStopState] = useState(true);
  const [showErrorStateRight, setShowErrorStateRight] = useState(false);
  const [minVal, setMinVal] = useState(minLeft);
  const [maxVal, setMaxVal] = useState(maxRight);
  const minValRef = useRef<HTMLInputElement | null>(null);
  const maxValRef = useRef<HTMLInputElement | null>(null);
  const range = useRef<HTMLInputElement | null>(null);

  const [firsLoad, setFirstLoad] = useState(true);
  const [valueTextLeft, setValueTextLeft] = useState(valuesAge.minAge);
  const [valueTextRight, setValueTextRight] = useState(valuesAge.maxAge);

  const [leftCirclePos, setLefCircle] = useState(16);
  const [rightCirclePos, setRightCircle] = useState(340);

  const [preventLeftEffect, setPreventLeftEffect] = useState(false);
  const [preventRightEffect, setPreventRightEffect] = useState(false);

  const [moveToRight, setMoveToRight] = useState(false);
  const [moveToLeft, setMoveToLeft] = useState(false);


  const [greaterLeft, setGreaterLeft] = useState(false);
  const [greaterRight, setGreaterRight] = useState(false);



  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minLeft!) / (maxRight! - minLeft!)) * 180),
    [minLeft, maxRight],
  );


  // const usePrevious = (value: any) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  useEffect(() => {
    if (greaterLeft) {
      console.log("GREATE LEFT")
      setMinVal(valueTextLeft);
      setMaxVal(valueTextLeft + 1);

    }
  }, [greaterLeft, valueTextLeft]);

  useEffect(() => {
    if (greaterRight) {
      //console.log("GREATER RIGHT")
      setMinVal(valueTextRight - 1);
      setMaxVal(valueTextRight);
    }
  }, [greaterRight, valueTextRight]);


  useEffect(() => {
    if (moveToRight) {
      //console.log("ACTION MOVE TO RIGHT")
      setMoveToRight(false);
      if (!greaterLeft && !greaterRight) {
        setMaxVal(maxVal + 1);
        setValueTextLeft(valueTextLeft + 1);
      } else {
        //setGreaterLeft(false);
      }
    }
  }, [moveToRight, greaterLeft, greaterRight, valueTextLeft, maxVal]);


  useEffect(() => {
    if (moveToLeft) {
      //console.log("ACTION MOVE TO LEFT")
      setMoveToLeft(false);
      if (!greaterLeft && !greaterRight) {
        setMinVal(minVal - 1);
        setValueTextRight(valueTextRight - 1);
      }
    }
  }, [moveToLeft, greaterLeft, greaterRight, valueTextRight, minVal]);

  useEffect(() => {
    if (!firsLoad) {
      changeValuesAge!({ ...valuesAge, minAge: valueTextLeft, maxAge: valueTextRight });
    } else {
      setFirstLoad(false);
    }
  }, [valueTextRight])

  useEffect(() => {
    if (!firsLoad) {
      changeValuesAge!({ ...valuesAge, minAge: valueTextLeft, maxAge: valueTextRight });
    } else {
      setFirstLoad(false);
    }
  }, [valueTextLeft])


  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (!preventLeftEffect) {
      //console.log("USER LEFT " + maxVal);
      if (maxValRef.current) {
        // setMinVal(
        //   minVal! >= 107 ? 107 : minVal! >= maxVal! ? maxVal! - 1 : minVal,
        // );

        //Push Handle Circle the Right
        //console.log("PUSHING RIGHT", maxVal! - minVal!);
        if (!preventRightEffect && Math.abs(maxVal! - minVal!) === 1 && maxVal! < 120) {
          //console.log("PUSHING RIGHT", maxVal! - minVal!);

          if (!greaterLeft && !greaterRight) {
            setMoveToRight(true);
          } else {
            setGreaterLeft(false);
            setGreaterRight(false);
          }
          //setMaxVal(maxVal! + 1);
          //setValueTextRight(minVal! + 1);
        } else if (preventRightEffect && Math.abs(maxVal! - minVal!) === 1 && maxVal! < 120) {
          //console.log("PUSHING RIGHT", maxVal! - minVal!);
          setMaxVal(maxVal!);
        }


        if (range.current && minVal! >= 0) {
          setPreventRightEffect(true);
          const minPercent = getPercent(minVal);
          const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number
          range.current.style.left = `${minPercent}%`;
          range.current.style.width = `${(maxPercent - minPercent) + 5}%`;
          //range.current.style.top = `${maxPercent - minPercent + 15}%`;
          setPreventRightEffect(false);
        }

        // For Scale 240
        //const leftCalc = minVal! <= 60 ? ((minVal!/2)*2.63333)+25 : ((minVal!/2)*2.63333)+25;
        const leftCalc = minVal! >= 0 ? minVal! * 2.63333 + 24 : 24;
        //const rightCalc = maxVal! <= 120 ? (maxVal!*2.63333)+24: (120*2.63333)+24;
        setLefCircle(leftCalc);
        setValueTextLeft(minVal!);

      }
    }
    //  console.log("Useer Effet minVal, getPercent");

  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (!preventRightEffect) {
      if (minValRef.current) {
        //setMaxVal(maxVal! < 13 ? 13 : maxVal! >= 121 ? 121 : maxVal);
        setMaxVal(maxVal! >= 121 ? 121 : maxVal);

        //Push Handle Circle the Left
        if (!preventLeftEffect && Math.abs(maxVal! - minVal!) === 1 && minVal! > 0) {
          //console.log("PUSHING LEFT", maxVal! - minVal!);

          if (!greaterLeft && !greaterRight) {
            setMoveToLeft(true);
          } else {
            setGreaterLeft(false);
            setGreaterRight(false);
          }

        }
        else if (!preventLeftEffect && Math.abs(maxVal! - minVal!) === 1 && minVal! > 0) {
          setMinVal(minVal!);
          setValueTextLeft(minVal!);
        }

        if (maxVal! > 120) {
          setStopState(false);
          setShowErrorStateRight(true);
        } else {
          setShowErrorStateRight(false);
        }


        const minPercent = getPercent(+minValRef.current.value);
        const maxPercent = getPercent(maxVal!);
        const rightCalc = maxVal! <= 120 ? maxVal! * 2.63333 + 55 : 120 * 2.63333 + 55;

        setRightCircle(rightCalc);
        setValueTextRight(maxVal!);

        if (range.current) {
          setPreventLeftEffect(true);
          //let widthPercent = maxPercent - minPercent <= 5 ? maxPercent - minPercent + 10 : maxPercent - minPercent + 5;
          range.current.style.left = `${minPercent}%`;
          range.current.style.width = `${(maxPercent - minPercent) + 10}%`;
          //range.current.style.top = `${maxPercent - minPercent + 5}%`;
          setPreventLeftEffect(false);
        }
      }
    }
    //console.log("Useer Effet maxVal, getPercent");

  }, [maxVal, getPercent]);

  return (
    <div>
      <div
        className={classNames("", {
          [classNames(MultiRangeSliderVariantClassName.default)]: !disabled,
        })}
      >
        <div>
          <div className="position-left-text">
            <TextInput3DigActive
              type={"text"}
              value={valueTextLeft!}
              placeholder={"0"}
              onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                let valueDigited = Number(event.target.value);
                if (valueDigited! >= 120 && valueDigited >= valueTextRight) {
                  valueDigited = 119;
                  setMaxVal(120);
                  setValueTextRight(120);
                } else if (valueDigited! >= 120) {
                  valueDigited = 119;
                } else if (valueDigited >= valueTextRight) {
                  console.log(" AQUI entra 1");
                  setGreaterLeft(true);
                } else if (Math.abs(valueDigited - valueTextRight) < 1) {
                  console.log(" AQUI entra 2");
                  setGreaterLeft(true);
                } else if (valueDigited < 0) {
                  valueDigited = 0;
                }
                console.log("Change Value right valueTextLeft", valueTextLeft + " - valueDigited : " + valueDigited);

                setMinVal(valueDigited);
                setValueTextLeft(valueDigited);

                //changeValuesAge({ ...valuesAge, maxAge: valueTextRight, minAge: valueDigited });

              }}
              onKeyDown={(_event) => {
                //handleTypeLeft(_event);
              }}
              variant={"Default"}
              errorState={false}
            />
          </div>
          <div className="Line-2-position Line-2"></div>
          <div className="position-right-text">
            <TextInput3DigActiveError
              id={"textRight"}
              type={"text"}
              value={valueTextRight}
              placeholder={"120"}
              errorState={showErrorStateRight}
              onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                let valueDigited = Number(event.target.value);
                if (valueDigited! >= 121) {
                  valueDigited = 121;
                  setStopState(false);
                  setShowErrorStateRight(true);
                } else if (valueDigited <= 1) {
                  valueDigited = 1;
                  setValueTextLeft(0);
                  setMinVal(0);
                  setShowErrorStateRight(false);
                } else if (valueDigited <= valueTextLeft) {
                  setGreaterRight(true);
                }
                console.log("Change Value Left valueTextRight", valueTextRight + " - valueDigited : " + valueDigited);

                setMaxVal(valueDigited);
                setValueTextRight(valueDigited);

                //changeValuesAge({ ...valuesAge, minAge: valueTextLeft, maxAge: valueDigited });

              }}
              onKeyDown={(_event) => {
                // handleTypeRight(_event);
              }}
              variant={"Default"}
            />
          </div>
        </div>
        <div className="slider-all-position">
          <input
            style={{ left: "-2px" }}
            type="range"
            min={minLeft}
            max={maxLeft}
            // value={minVal! >= 107 ? 107 : minVal}
            value={minVal}
            ref={minValRef}
            onChange={(event) => {
              setPreventLeftEffect(false);
              const value = Math.min(+event.target.value, maxVal! - 1);
              setMinVal(value);
              event.target.value = value.toString();

            }}
            className={classNames("thumb thumb--zindex-3", {
              "thumb--zindex-5": minVal! > maxRight! - 121,
            })}
          />
          <input
            style={{ left: "33px" }}
            type="range"
            min={minRight}
            max={maxRight}
            // value={maxVal! <= 13 ? 13 : maxVal}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
              setPreventRightEffect(false);
              const value = Math.max(+event.target.value, minVal! + 1);
              setMaxVal(value);
              event.target.value = value.toString();

            }}
            className="thumb thumb--zindex-4"
          />

          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
          </div>
        </div>
        <div
          id="sliderNotAnima"
          className="circular-progress-circle-grp1 slider-position"
          style={{ left: `${leftCirclePos}px` }}
        ></div>
        <div
          id="sliderAnima"
          style={{ left: `${rightCirclePos}px` }}
          className={classNames("slider-position", {
            "circular-progress-circle-grp1": !showErrorStateRight,
          })}
        >
          {showErrorStateRight && (
            <Lottie
              options={{
                animationData,
                autoplay: true,
              }}
              width={36}
              height={36}
              style={{ margin: "0 0 0" }}
              isStopped={stStopped}
            />
          )}
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  minLeft: PropTypes.number.isRequired,
  maxRight: PropTypes.number.isRequired,
};
