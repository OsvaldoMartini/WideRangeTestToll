import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./multi-range-slider.css";
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
  min: number;
  max: number;
  variant: MultiRangeSliderVariant;
  onChange?: ChangeEvent<HTMLElement>;
  disabled?: boolean;
  handleChange?: any;
  onKeyDown?: KeyboardEvent<HTMLInputElement>;
}

export const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  variant = "Inactive",
  onChange,
  disabled,
  handleChange,
  onKeyDown,
  ...multSlidProps
}) => {
  const MultiRangeSliderVariantClassName =
    MultiRangeSliderVariantClasses[variant];
  const [stStopped, setStopState] = useState(true);
  const [showErrorStateRight, setShowErrorStateRight] = useState(false);
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement | null>(null);
  const maxValRef = useRef<HTMLInputElement | null>(null);
  const range = useRef<HTMLInputElement | null>(null);

  const [valueTextLeft, setValueTextLeft] = useState(0);
  const [valueTextRight, setValueTextRight] = useState(120);

  const [leftCirclePos, setLefCircle] = useState(16);
  const [rightCirclePos, setRightCircle] = useState(340);

  const [preventLeftEffect, setPreventLeftEffect] = useState(false);
  const [preventRightEffect, setPreventRightEffect] = useState(false);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min!) / (max! - min!)) * 160),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (!preventLeftEffect) {
      console.log("USER LEFT " + maxVal);

      if (maxValRef.current) {
        setMinVal(
          minVal! >= 107 ? 107 : minVal! >= maxVal! ? maxVal! - 1 : minVal,
        );

        //Push Handle Circle the Right
        if (Math.abs(maxVal! - minVal!) <= 13 && minVal! <= 107) {
          // console.log(maxVal, minVal)
          // setValueTextRight(minVal! + 13);
          setMaxVal(minVal! + 13);
        }

        if (range.current && minVal! >= 0) {
          const minPercent = getPercent(minVal);
          const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number
          range.current.style.left = `${minPercent + 5}%`;
          range.current.style.width = `${maxPercent - minPercent + 5}%`;
        }

        // For Scale 240
        //const leftCalc = minVal! <= 60 ? ((minVal!/2)*2.63333)+25 : ((minVal!/2)*2.63333)+25;
        const leftCalc = minVal! >= 0 ? minVal! * 2.63333 + 24 : 24;
        //const rightCalc = maxVal! <= 120 ? (maxVal!*2.63333)+24: (120*2.63333)+24;
        setLefCircle(leftCalc);
        setValueTextLeft(minVal!);
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (!preventRightEffect) {
      console.log("USER RIGHT" + minVal);
      if (minValRef.current) {
        setMaxVal(maxVal! < 13 ? 13 : maxVal! >= 121 ? 121 : maxVal);

        //Push Handle Circle the Left
        if (Math.abs(maxVal! - minVal!) <= 13 && minVal! > 0) {
          // console.log(maxVal, minVal)
          // setValueTextRight(minVal! + 13);
          setMinVal(maxVal! - 13 < 0 ? 0 : maxVal! - 13);
        }

        if (maxVal! > 120) {
          setStopState(false);
          setShowErrorStateRight(true);
        } else {
          setShowErrorStateRight(false);
        }
        const minPercent = getPercent(+minValRef.current.value + 5);
        const maxPercent = getPercent(maxVal! + 5);
        const rightCalc =
          maxVal! <= 120 ? maxVal! * 2.63333 + 24 : 120 * 2.63333 + 24;
        setRightCircle(rightCalc);
        setValueTextRight(maxVal!);

        if (range.current) {
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  // useEffect(() => {

  //   onChange();

  // }, [minVal, maxVal, onChange]);

  const handleTypeLeft = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    //console.log(e.target.);
    console.log("RIGHT " + valueTextRight + "    LEFT " + valueTextLeft);
    if (e.key === "Enter") {
      setPreventLeftEffect(false);
      setPreventRightEffect(true);
      //setValueTextRight(maxVal);
      setMinVal(valueTextLeft <= 0 ? 0 : valueTextLeft);

      if (valueTextLeft! >= 107) {
        setValueTextLeft(107);
        setMinVal(107);
        setMaxVal(120);
        setPreventRightEffect(false);
        setValueTextRight(maxVal!);
      } else if (valueTextLeft >= valueTextRight) {
        setMaxVal(valueTextLeft + 13);
        setMinVal(valueTextLeft);
        setPreventRightEffect(false);
        setValueTextRight(maxVal!);
        setValueTextLeft(minVal!);
      } else if (Math.abs(valueTextLeft - valueTextRight) < 13) {
        setMaxVal(valueTextLeft + 13);
        setMinVal(valueTextLeft);
        setPreventRightEffect(false);
        setValueTextRight(maxVal!);
        setValueTextLeft(minVal!);
      }
    }
  };

  const handleTypeRight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    //console.log(e.target.);
    console.log("RIGHT " + valueTextRight);
    if (e.key === "Enter") {
      setPreventLeftEffect(true);
      setPreventRightEffect(false);
      setMaxVal(valueTextRight >= 121 ? 121 : valueTextRight);

      if (valueTextRight! <= 13) {
        setValueTextLeft(0);
        setMinVal(0);
        setMaxVal(13);
        setPreventLeftEffect(false);
        setValueTextRight(maxVal!);
      } else if (valueTextRight <= valueTextLeft) {
        // || Math.abs(valueTextRight - valueTextLeft) < 13) {
        setMinVal(valueTextRight - 13);
        setMaxVal(valueTextRight);
        setPreventLeftEffect(false);
        setValueTextLeft(minVal!);
        setValueTextRight(maxVal!);
      }
    }
  };

  return (
    <div {...multSlidProps}>
      <div
        className={classNames("", {
          [classNames(MultiRangeSliderVariantClassName.default)]: !disabled,
        })}
      >
        <div>
          <div className="position-left-text">
            <TextInput3DigActive
              id={"textLeft"}
              type={"text"}
              value={valueTextLeft!}
              placeholder={"0"}
              onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                setValueTextLeft(Number(event.target.value));
              }}
              onKeyDown={(_event) => {
                handleTypeLeft(_event);
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
              onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                setValueTextRight(Number(event.target.value));
              }}
              onKeyDown={(_event) => {
                handleTypeRight(_event);
              }}
              variant={"Default"}
            />
          </div>
        </div>
        <div className="slider-all-position">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal! >= 107 ? 107 : minVal}
            ref={minValRef}
            onChange={(event) => {
              setPreventLeftEffect(false);
              const value = Math.min(+event.target.value, maxVal! - 1);
              setMinVal(value);
              event.target.value = value.toString();
            }}
            className={classNames("thumb thumb--zindex-3", {
              "thumb--zindex-5": minVal! > max! - 100,
            })}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal! <= 13 ? 13 : maxVal}
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
          className="circular-progress-circle-gr1 slider-position"
          style={{ left: `${leftCirclePos}px` }}
        ></div>
        <div
          id="sliderAnima"
          style={{ left: `${rightCirclePos}px` }}
          className={classNames("slider-position", {
            "circular-progress-circle-gr1": !showErrorStateRight,
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
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  // onChange: PropTypes.func.isRequired,
};
