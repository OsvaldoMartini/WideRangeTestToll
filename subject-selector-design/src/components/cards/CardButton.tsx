import React, { FC, useState } from "react";
import classNames from "classnames";

type CardButtonVariant =
  | "InitialState"
  | "HoverCriteria"
  | "SearchCriteria"
  | "HoverSearchCriteria"
  | "SearchCriteriaClicked"
  | "CardWithFilter"
  | "BootstrapCriteria";

type CardButtonState =
  | "default"
  | "typographyTitle"
  | "typoTitlePosition"
  | "svgPosition";

const CardButtonVariantClasses: Record<
  CardButtonVariant,
  Record<CardButtonState, string>
> = {
  InitialState: {
    default: "card-main-button",
    typographyTitle: "card-main-text-typography",
    typoTitlePosition: "card-main-typography-position",
    svgPosition: "card-plus-home-page-position",
  },
  HoverCriteria: {
    default: "card-main-button",
    typographyTitle: "card-main-text-typography",
    typoTitlePosition: "card-main-typography-position",
    svgPosition: "card-plus-home-page-position",
  },
  SearchCriteria: {
    default: "button-search-criteria",
    typographyTitle: "button-criteria-text text-white",
    typoTitlePosition: "card-main-typography-position",
    svgPosition: "card-plus-criteria-position",
  },
  HoverSearchCriteria: {
    default: "hover-plus-criteria-button",
    typographyTitle: "hover-plus-criteria-text ",
    typoTitlePosition: "card-main-typography-position",
    svgPosition: "card-plus-criteria-position",
  },
  SearchCriteriaClicked: {
    default: "hover-plus-criteria-clicked",
    typographyTitle: "hover-plus-criteria-clicked-text",
    typoTitlePosition: "card-main-typography-position",
    svgPosition: "hidden",
  },
  CardWithFilter: {
    default: "card-with-age-filter",
    typographyTitle: "card-with-filter-title-text",
    typoTitlePosition: "card-with-filter-title-position",
    svgPosition: "hidden",
  },
  BootstrapCriteria: {
    default: "card-main-button-boot",
    typographyTitle: "card-main-text-typography",
    typoTitlePosition: "card-main-typography-position-boot",
    svgPosition: "card-plus-home-page-position-boot",
  },
};

export interface CardButtonProps {
  children?: string | React.ReactElement;
  className?: string;
  classNamePlus?: string;
  variant: CardButtonVariant;
  disabled?: boolean;
  title?: string;
  subTitle?: string;
  description?: string;
  mainCardPage?: boolean
  addClassNames?: string;
  addLeftPos?: string;
  addTopPos?: string;
  addWidth?: string;
  addPlusPos?: string;
  opacity?: string;
  buttCriteria?: any;
  hoverClicked?: boolean;
  onClick?: (card: any) => void;
  // parentClickCallback?: (buttonClicked: any) => void;
}

export const CardButton: FC<CardButtonProps> = ({
  children,
  className,
  classNamePlus,
  variant,
  mainCardPage = true,
  opacity,
  disabled,
  title,
  subTitle,
  description,
  addClassNames = "",
  addLeftPos,
  addTopPos,
  addWidth,
  addPlusPos,
  buttCriteria,
  hoverClicked,
  // parentClickCallback,
  ...cardButtonProps
}) => {
  // const divRef = useRef<HTMLDivElement>(null)

  const [hoverSearchCriteria, setHoverSearchCriteria] = useState(false);

  const [opacityEvent, setOpacity] = useState(opacity);
  //const [buttonClicked, setButtonClicked] = useState(false);
  // const [textTitle, setTextTitle] = useState(subTitle);
  // const [dynWidth, setDynWidht] = useState(110);


  // const CardButtonVariantClassName = buttonClicked
  //   ? CardButtonVariantClasses["HoverCriteriaClicked"]
  //   : !buttonClicked && hoverButton
  //   ? CardButtonVariantClasses["HoverCriteria"]
  //   : CardButtonVariantClasses[variant];

  // const CardButtonVariantClassName =
  //   hoverButton && mainCardPage
  //     ? CardButtonVariantClasses["HoverCriteria"]
  //     : hoverButton && !mainCardPage
  //       ? CardButtonVariantClasses["HoverSearchCriteria"]
  //       : CardButtonVariantClasses[variant];



  // const CardButtonVariantClassName = CardButtonVariantClasses[variant];

  mainCardPage =
    variant === "InitialState" || variant === "HoverCriteria" || variant === "BootstrapCriteria" || false;

  const cardFilter = variant === "CardWithFilter";

  const CardButtonVariantClassName =
    hoverSearchCriteria && !mainCardPage
      ? CardButtonVariantClasses["HoverSearchCriteria"]
      : CardButtonVariantClasses[variant];

  const getTextWidth = (valueText: string) => {
    let text = document.createElement("span");
    document.body.appendChild(text);

    text.style.font = "FrutigerLTStd-Roman";
    text.style.fontSize = 14 + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = valueText;
    //text.hidden = true;
    let width = Math.ceil(text.clientWidth) + 25;
    document.body.removeChild(text);

    return width;
  }


  // const buttonClicked = (buttCriteria: any) => {
  //   console.log("cardCliked", buttCriteria)
  //   // { parentClickCallback!({ buttCriteria }) }
  //   setTextTitle(buttCriteria.subTitle)
  // }


  let dynAddWidth = !addWidth || getTextWidth(title!);

  return (
    <div
      {...cardButtonProps}
      className={`${addClassNames}`}
      style={{ left: `${addLeftPos}`, width: `${dynAddWidth}px`, top: `${addTopPos}` }}
    // onClick={() => {
    //   //console.log(hoverClicked);
    //   // setButtonClicked(!buttonClicked && hoverClicked);
    //   buttonClicked(buttCriteria);
    // }}
    >
      <div
        div-clicked={String(hoverClicked)}
        onMouseEnter={() => {
          if (variant !== "CardWithFilter") {
            mainCardPage ? setOpacity("100%") : setOpacity("0");
            setHoverSearchCriteria(true);
          }
        }}
        onMouseLeave={() => {
          if (variant !== "CardWithFilter") {
            mainCardPage ? setOpacity("40%") : setOpacity("100%");
            setHoverSearchCriteria(false);
          }
        }}
        className={classNames("", {
          [classNames(CardButtonVariantClassName.default)]: !disabled,
        })}
      >
        <div
          className={classNames("", className, {
            [classNames(CardButtonVariantClassName.typoTitlePosition)]: !disabled,
          })}
        >
          <div
            className={classNames("", className, {
              [classNames(CardButtonVariantClassName.typographyTitle)]: !disabled,
            })}
          >
            {title}
          </div>
        </div>
        {!cardFilter && (
          <div
            style={{ left: `${addPlusPos}` }}
            className={classNames("", classNamePlus, {
              [classNames(CardButtonVariantClassName.svgPosition)]: !disabled,
            })}
          >
            {mainCardPage && (
              <svg style={{ cursor: "pointer" }}
                width="33"
                height="32"
                viewBox="0 0 33 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.66 8c.553 0 1.001.448 1.001 1v5.999l6.013.001a1.001 1.001 0 1 1 0 2H17.66v6a1.001 1.001 0 0 1-2.004 0v-6H9.645a1.001 1.001 0 1 1 0-2h6.012V9c0-.552.449-1 1.002-1z"
                  fill="#111"
                  fillRule="evenodd"
                  opacity={variant === "InitialState" ? opacity : opacityEvent}
                />
              </svg>
            )}

            {!mainCardPage && hoverSearchCriteria && (
              <svg style={{ cursor: "pointer" }}
                width="24"
                height="24"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  opacity={variant === "SearchCriteria" ? opacity : opacityEvent}
                >
                  <circle
                    fill="#005EB8"
                    fillRule="nonzero"
                    cx="16"
                    cy="16"
                    r="12"
                  />
                  <path
                    d="M16 11v10m-5-5h10"
                    stroke="#FFF"
                    strokeWidth="2.667"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            )}
          </div>
        )}
        {/* 
        {cardFilter && (

          <div
            className={"card-with-filter-description-position"}
          >
            <div
              className={"card-with-filter-description-text"}
            >
              {description}
            </div>
          </div>

        )} */}

        {cardFilter && (

          <div
            className={"card-with-filter-subtitle-position"}
          >
            <div
              className={"card-with-filter-subtitle-text"}
            >
              {subTitle}
            </div>
          </div>

        )}
      </div>
    </div>
  );
};
