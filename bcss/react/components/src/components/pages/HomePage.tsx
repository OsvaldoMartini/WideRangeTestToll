import React, { FC, useState, useEffect, useCallback } from "react";
import { HeaderComp } from "../navigation/HeaderComp";
import { SubHeader } from "../navigation/SubHeader";
import { ChooseCriteriaTittle } from "../labels/ChooseCriteriaTittle";
import { AnimationPlaceHolder } from "../placeholders/AnimationPlaceHolder";
import { cardsData } from "../../data";
import { ModalContainer } from "../modals/ModalContainer";
import { ButtonComp } from "../buttons/ButtonComp";
import { ICardMainData } from "../@interfaces";
import { CardButton } from "../cards/CardButton";
import { OptionSelectorGroup } from "../options/OptionSelectorGroup";
import { TextInput3DigActive } from "../textinput/TextInput3DigActive";

type HomePageVariant = "InitialState" | "HoverCriteria";

export interface HomePageProps {
  children?: string | React.ReactElement;
  title: string;
  className?: string;
  variant: HomePageVariant;
  disabled?: boolean;
}

export const HomePage: FC<HomePageProps> = ({
  children,
  title = "Search",
  className,
  variant = "InitialState",
  disabled,
  ...homePageProps
}) => {
  const [cardSelection, setCardSelection] = useState<any>([]);
  const [groupButtons, setGroupButtons] = useState<any>([]);

  const [modalCriteriaActive, setModalCriteriaActive] = useState(false);
  const [modalFilterAgeCriteria, setModalFilterAgeCriteria] = useState(false);
  const [selectAgeCriteria, setSelectAgeCriteria] = useState(false);
  const [filterSelected, setFilterSelected] = useState(null);
  const [inputTextactive, setInputTextActive] = useState(false);
  const [stopPlaceAnimation, setStopAnimation] = useState(false);
  const [showLabelValues, setShowLabelValues] = useState(false);
  const [valueTextAge, setValueTextAge] = useState(333.333);

  const [disableButtons, setDisableButtons] = useState(false);
  const [betweenOperation, setBetweenOperation] = useState(false);
  const [operationSelected, setOperationSelected] = useState<any>();
  const [minAgeValue, setMinAgeValue] = useState(0);
  const [maxAgeValue, setMaxAgeValue] = useState(50);



  const setLabelValues = () => {
    if (minAgeValue >= 0 || maxAgeValue <= 120) {
      setShowLabelValues(true);
    } else {
      setShowLabelValues(false);
    }
  };

  const spacerD10 = [176, 1204];
  const spacerWidths = [64, 154, 8];

  const drawSpacerDs = (idx: number) => {
    return (
      <div {...homePageProps} className="box-set">
        <figure
          className={"box-D10 D10-pos"}
          style={{ left: `${spacerD10[idx]}px` }}
        ></figure>
      </div>
    );
  };

  const middleSpacers = (posIndex: number, index: number, limit: number) => {
    if (index < limit - 1) {
      return (
        <div className="box-set">
          <figure
            className={"box-D2 D2-pos"}
            style={{ left: `${posIndex}px` }}
          ></figure>
        </div>
      );
    } else {
      return null;
    }
  };

  const subjectSelected = (butt: any) => {
    //setFilterAction(butt.action);
    setFilterSelected(butt.filterName);
    //console.logbutt);

    groupButtons.map((button: any) => {
      if (butt.id !== button.id) {
        button.hoverClicked = false;
      } else {
        button.hoverClicked = true;
      }
    });

    if (butt.action !== undefined && butt.action === "AgeCriteriaVar") {
      setInputTextActive(false);
      setSelectAgeCriteria(true);
    } else {
      setSelectAgeCriteria(false);
      setInputTextActive(true);
    }
  };


  const handleCardSelection = (card: any) => {
    //console.logcard)
    setStopAnimation(true);
    setCardSelection(card ?? []);
    setModalCriteriaActive(true);
  };


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

  const setInitialCard = () => {
    const initialPosition = [32];
    const spacerWidths = [6, 10, 14];

    let sum = initialPosition[0];

    //console.log"modalCriteriaActive", modalCriteriaActive);
    if (modalCriteriaActive) {
      //console.logcardSelection);

      let buttonsCriteria = cardSelection && cardSelection?.criteriaOptions!.map((item: any) => {
        //if (index === 0) {
        let dynWidth = getTextWidth(item.title);
        let box_pos = sum + dynWidth;
        let left_pos = sum;
        sum += dynWidth + spacerWidths[0];
        let plus_pos = Math.abs(dynWidth / 2) - 2;  //+ left_pos;
        //console.log
        //   // "item.width :" + item.width,
        //   "dynWidth: " + dynWidth,
        //   "leftPos: " +
        //   left_pos +
        //   "    boxPos  :  " +
        //   box_pos +
        //   " Prox " +
        //   sum +
        //   "  PlusPos " +
        //   plus_pos,
        // );

        return {
          id: item.id,
          title: item.title,
          action: item.action || "Default",
          filterName: item.filterName || item.title,
          width: dynWidth, //item.width,
          pressed: false,
          addLeftPos: left_pos,
          spacerBoxPos: box_pos,
          plusPos: plus_pos,
          hoverClicked: item.hoverClicked || false,
        };

      });
      setGroupButtons(buttonsCriteria)
      //setCardSelection(cardSelection);
      //console.logbuttonsCriteria);

    }
  }


  useEffect(() => { }, [stopPlaceAnimation]);

  useEffect(() => {

  }, [modalCriteriaActive]);


  useEffect(() => {
    setInitialCard();
  }, [cardSelection]);


  // section Render Buttons Criteria from the Previous Selection
  const renderButtonsCriteria = () => {
    const middleSpacers = (posIndex: number, index: number, limit: number) => {
      if (index < limit - 1) {
        return (
          <div className="box-set">
            <figure
              className={"box-D3 D3-pos"}
              style={{ left: `${posIndex}px` }}
            ></figure>
          </div>
        );
      } else {
        return null;
      }
    };

    const handleTypeTextAge = (e: React.KeyboardEvent<HTMLInputElement>) => {
      //console.loge.key);
      if (e.key === "Enter") {
        // if (valueTextAge! >= 121) {
        //   setValueTextAge(120);
        // } else if (valueTextAge < 1) {
        //   setValueTextAge(1);
        // }
      }
    };

    return (
      <div>
        <div className="buttons-criteria-place-holder">
          {groupButtons &&
            groupButtons.map((butt: any, index: number) => {
              //  if (index <= 1) {
              //   sum += spacerD10[index] + spacerWidths[0];
              // } else {
              //   sum += spacerWidths[2];
              // }
              //console.log(butt.width);
              return (
                <div key={`_${butt.id}`}>
                  <div>
                    <CardButton
                      key={`buttCrit_${butt.id}`}
                      title={butt.title}
                      addClassNames={`box-btn-criteria`}
                      addLeftPos={`${butt.addLeftPos}px`}
                      addWidth={`${butt.width}`}
                      addPlusPos={`${butt.plusPos}px`}
                      variant={butt.hoverClicked ? "SearchCriteriaClicked" : "SearchCriteria"}
                      buttCriteria={butt}
                      onClick={() => {
                        subjectSelected(butt);
                        // setHoverClicked(!hoverClicked);

                        // onActionCallback!(butt.action);
                        // setCardSelection(card);
                        // setModalCriteriaActive(true);
                      }}
                      hoverClicked={butt.hoverClicked}
                    // parentClickCallback={clickCallbackChecked}
                    />
                  </div>
                  {middleSpacers(
                    butt.spacerBoxPos,
                    index,
                    cardSelection.length,
                  )}
                </div>
              );
              // }
            })}
        </div>
        {selectAgeCriteria && (
          <div className="box-subject-criteria-selected">
            <div className="label-criteria-selected-position">
              <div className="label-criteria-selected">{filterSelected}</div>
            </div>
            {showLabelValues && (
              <div>
                {/* <div className="label-age-title-position">
                  <div className="label-age-title">{operationSelected.title}</div>
                </div> */}
                {/* {betweenOperation && (<div className="label-age-values-position"> */}
                {betweenOperation && (<div className="label-age-title-position">
                  <div className="label-age-values">
                    {operationSelected.title}  {minAgeValue}-{maxAgeValue}</div></div>)}
                {/* {!betweenOperation && (<div className="label-age-values-position"> */}
                {!betweenOperation && (<div className="label-age-title-position">
                  <div className="label-age-values">
                    {operationSelected.title}  {minAgeValue}</div></div>)}
              </div>
            )}
            {!showLabelValues && (
              <div className="select-age-criteria-selection-position">
                <ButtonComp
                  title={"Select Age Criteria"}
                  variant={"ButtonSelectAgeCriteria"}
                  onClick={() => {
                    setModalFilterAgeCriteria(true);
                    // onActionCallback!(butt.action);
                    // setCardSelection(card);
                    // setModalCriteriaActive(true);
                  }}
                />
              </div>
            )}
          </div>
        )
        }
        {
          inputTextactive && (
            <div className="box-subject-criteria-selected">
              <div className="label-criteria-selected-position">
                <div className="label-criteria-selected">{filterSelected}</div>
              </div>
              <div className="nhs-number-input-position">
                <TextInput3DigActive
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
                  variant={"NHSNumber"}
                />
              </div>
            </div>
          )
        }
      </div >
    );
  };



  const valuesState = useCallback((values: any) => {
    console.log("Home Page Value State", values);


    if (values.minVal > 120 || values.maxVal > 120) {
      setDisableButtons(true);
    } else {
      setBetweenOperation(true);
    }


    if (values.maxVal > 120) {
      setMinAgeValue(120);
    }

    if (values.minVal >= 0 && values.maxVal === -9999) {
      setBetweenOperation(false);
    } else {
      setBetweenOperation(true);
    }

    setOperationSelected(values);
    setMinAgeValue(values.minVal);
    setMaxAgeValue(values.maxVal);

  }, []);

  var sum = 0;

  return (
    <div>
      <div className="Desktop-HD-1440-Landing-Page">
        <HeaderComp open={true} toggleOpen={() => { }} />
        <hr className="divider-line" />
        <SubHeader open={true} toggleOpen={() => { }} />
        {modalCriteriaActive && <div className="main-disabled" />}
        <div className="Desktop-Bar-Space" />
        {drawSpacerDs(0)}
        {cardsData &&
          cardsData.map((card: ICardMainData, index: number) => {
            if (index === 0) {
              sum += spacerD10[index] + spacerWidths[0];
            } else {
              sum += spacerWidths[2];
            }
            return (
              <div key={`_${card.id}`}>
                <div>
                  <CardButton
                    addClassNames={`box-card`}
                    addLeftPos={`${sum}px`}
                    addTopPos={"194px"}
                    key={`card_${card.id}`}
                    title={card.title}
                    variant={"HoverCriteria"}
                    buttCriteria={card}
                    opacity={0.3}
                    onClick={() => {
                      handleCardSelection(card);
                    }}
                  />
                </div>
                {middleSpacers(
                  (sum += spacerWidths[1]),
                  index,
                  cardsData.length,
                )}
              </div>
            );
          })}
        {drawSpacerDs(1)}
        <div className="choose-criteria-label-position">
          <ChooseCriteriaTittle open={true} toggleOpen={() => { }} />
        </div>
        <div className="main-place-holder-position">
          <AnimationPlaceHolder stopAnimation={stopPlaceAnimation} />
        </div>
        <div className="button-search-position">
          <ButtonComp title={title} variant={"ButtonMainPage"} />
        </div>

        {modalCriteriaActive && cardSelection! && (
          <div>
            <ModalContainer
              show={modalCriteriaActive}
              onHide={() => {
                //callbackOnHide}
                setInitialCard();
                setShowLabelValues(false);
                setModalCriteriaActive(false);
                setSelectAgeCriteria(false);
                setStopAnimation(false);
                setInputTextActive(false);
              }}
              //  onActionCallback={callbackOnAction}
              card={cardSelection}
              variant={"Default"}
              disabled={false}
              children={renderButtonsCriteria()}
            />
          </div>
        )}

        {modalFilterAgeCriteria && (
          <div className="modal-card-subject-disabled" />
        )}
        {modalFilterAgeCriteria && (
          <div>
            <ModalContainer
              title="Select Age Criteria"
              show={modalFilterAgeCriteria}
              onHide={() => setModalFilterAgeCriteria(false)} //callbackOnHide}
              onOkay={() => setLabelValues()}
              variant={
                filterSelected !== "Default" ? "AgeCriteriaVar" : "Default"
              }
              disabled={false}
              okayDisabled={disableButtons}

            //</div>variant={"Default"}
            >
              <div>
                <OptionSelectorGroup
                  parentCallback={valuesState}
                />
              </div>
            </ModalContainer>
          </div>
        )}

        <div className="rectangle-bottom"></div>
      </div>
    </div>
  );
};
