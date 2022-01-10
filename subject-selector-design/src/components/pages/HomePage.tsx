import React, { FC, useState, useEffect, useCallback } from "react";
import { CardMain } from "../cards/CardMain";
import { HeaderComp } from "../navigation/HeaderComp";
import { SubHeader } from "../navigation/SubHeader";
import { ChooseCriteriaTittle } from "../labels/ChooseCriteriaTittle";
import { AnimationPlaceHolder } from "../placeholders/AnimationPlaceHolder";
import { ICardMainData } from "../../@interfaces/CardMainData.d";
import { cardsData } from "../../data";
import { ModalContainer } from "../modals/ModalContainer";
import { ButtonComp } from "../buttons/ButtonComp";
import { CardButton, OptionSelectorGroup, TextInput3DigActive } from "../..";


type HomePageVariant = "Inactive" | "HoverActive";

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
  variant = "Default",
  disabled,
  ...homePageProps
}) => {
  const [cardSelection, setCardSelection] = useState({});
  const [modalCriteriaActive, setModalCriteriaActive] = useState(false);
  const [modalFilterAgeCriteria, setModalFilterAgeCriteria] = useState(false);
  const [selectAgeCriteria, setSelectAgeCriteria] = useState(false);
  const [filterSelected, setFilterSelected] = useState(null);
  const [inputTextactive, setInputTextActive] = useState(false);
  //const [filterAction, setFilterAction] = useState("");
  const [stopPlaceAnimation, setStopAnimation] = useState(false);

  const [hoverInverted, setHoverInverted] = useState(false);
  
  //const [groupButtons, setGroupButtons] = useState([]);

  const [valueTextAge, setValueTextAge] = useState(333.333);

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


  const clickCallbackChecked = useCallback((butt: any) => {
    console.log("Change clicked : ", butt);
    
    setFilterSelected(butt.filterName);
    setHoverInverted(true);

    // buttonsCriteria.map((button: any) => {
    //   if (butt.id !== button.id){
    //   button.hoverClicked = false;
    //   } else{
    //     button.hoverClicked = true;
    //   }
    // });
    
    console.log("BUTTONS ", butt);
    
    if (butt.action !== undefined && butt.action === "AgeCriteriaVar") {
      setInputTextActive(false);
      setSelectAgeCriteria(true);
    } else {
      setSelectAgeCriteria(false);
      setInputTextActive(true);
    }



    
    // setGroupOptions(
    //   groupOption.map((opt, index) => {
    //     if (opt.id === id) {
    //       opt.checked = true;
    //       setValueTextAge(1);
    //       opt.addHeight =
    //         index < groupOption.length - 1
    //           ? spacerHights[1] + box_nested[1]
    //           : box_nested[2];
    //     } else {
    //       opt.checked = false;
    //       opt.addHeight = spacerHights[1];
    //       setValueTextAge(1);
    //     }

    //     return opt;
    //   }),
    // );
  }, []);

  // const callbackOnHide = useCallback((value:boolean) => {
  //   console.log('Change Checked : ' , value );
  //  if (modalFilterActive){
  //    setModalFilterActive(false);
  //  } else{
  //   setModalCriteriaActive(value);
  //   setStopAnimation(value);
  //  }
  // },[]);

  // const callbackOnAction = useCallback((value:string) => {
  //   console.log('Action Checked : ' , value );
  //  setModalCriteriaActive(value);
  //  setStopAnimation(value);
  // },[]);

  // const callbackChecked = useCallback((action:string) => {
  //   console.log('Change Action : ' , action );
  //   setButtonsActive(false);
  //   if (action === "ageCriteriaOptions") {
  //    setSelectCriteria(true);
  //   }
  //     },[]);

  const subjectSelected = (butt: any, buttonsCriteria:any) => {
    //setFilterAction(butt.action);
    setFilterSelected(butt.filterName);

    // buttonsCriteria.map((button: any) => {
    //   if (butt.id !== button.id){
    //   button.hoverClicked = false;
    //   } else{
    //     button.hoverClicked = true;
    //   }
    // });
    
    console.log("BUTTONS ", buttonsCriteria);
    
    if (butt.action !== undefined && butt.action === "AgeCriteriaVar") {
      setInputTextActive(false);
      setSelectAgeCriteria(true);
    } else {
      setSelectAgeCriteria(false);
      setInputTextActive(true);
    }

    //setHoverClicked(true);
  };

  useEffect(() => {}, [stopPlaceAnimation]);

  // const callButtonSubject =() => {
  //   setModalCriteriaActiveActive(false);
  //   setButtonsActive(true);
  // }

  useEffect(() => {}, [modalCriteriaActive]);

  const handleCardSelection =(card:any) => {
    setStopAnimation(true);
    setCardSelection(card);
    setModalCriteriaActive(true);
    
  }

  // section Render Buttons Criteria from the Previous Selection
  const renderButtonsCriteria = (card: any) => {
    const initialPosition = [32];
    const spacerWidths = [8, 10, 14];

    let sum = initialPosition[0];

    let buttonsCriteria = card?.criteriaOptions?.map((item: any) => {
      //if (index === 0) {
      let box_pos = sum + item.width;
      let left_pos = sum;
      sum += item.width + spacerWidths[1];
      // let plus_pos = Math.abs(item.width / 2) - 15;
      // console.log(
      //   "leftPos: " +
      //     left_pos +
      //     "    boxPos  :  " +
      //     box_pos +
      //     " Prox " +
      //     sum +
      //     "  PlusPos " +
      //     plus_pos,
      // );
      return {
        id: item.id,
        title: item.title,
        action: item.action,
        filterName: item.filterName,
        width: "auto",//item.width,
        pressed: false,
        addLeftPos: left_pos,
        spacerBoxPos: box_pos,
        plusPos: "auto",//plus_pos,
        hoverClicked: item.hoverClicked
      };
    });

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
      console.log(e.key);
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
          {buttonsCriteria &&
            buttonsCriteria.map((butt: any, index: number) => {
              //  if (index <= 1) {
              //   sum += spacerD10[index] + spacerWidths[0];
              // } else {
              //   sum += spacerWidths[2];
              // }
              console.log(butt.width);
              return (
                <div key={`_${butt.id}`}>
                  <div>
                    <CardButton
                      key={`buttCrit_${butt.id}`}
                      title={butt.title}
                      addClassNames={`box-btn-criteria`}
                      addLeftPos={`${butt.addLeftPos}px`}
                      addWidth={`${butt.width}`}
                      addPlusPos={butt.plusPos}
                      variant={"SearchCriteria"}
                      buttCriteria={butt}
                      onClick={() => {
                        subjectSelected(butt, buttonsCriteria);
                       // setHoverClicked(!hoverClicked);

                        // onActionCallback!(butt.action);
                        // setCardSelection(card);
                        // setModalCriteriaActive(true);
                      } } 
                      
                      hoverClicked={true}
                      parentClickCallback={clickCallbackChecked}
                      />
                  </div>
                  {middleSpacers(
                    butt.spacerBoxPos,
                    index,
                    buttonsCriteria.length,
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
          </div>
        )}
        {inputTextactive && (
          <div className="box-subject-criteria-selected">
            <div className="label-criteria-selected-position">
              <div className="label-criteria-selected">{filterSelected}</div>
            </div>
            <div className="nhs-number-input-position">
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
                variant={"NHSNumber"}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  var sum = 0;

  return (
    <div>
      <div className="Desktop-HD-1440-Landing-Page">
        <HeaderComp open={true} toggleOpen={() => {}} />
        <hr className="divider-line" />
        <SubHeader open={true} toggleOpen={() => {}} />
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
                  <CardMain
                    addClassNames={`box-card`}
                    addLeftPos={`${sum}px`}
                    key={`card_${card.id}`}
                    title={card.title}
                    variant={"HoverActive"}
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
          <ChooseCriteriaTittle open={true} toggleOpen={() => {}} />
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
                setModalCriteriaActive(false);
                setSelectAgeCriteria(false);
                setStopAnimation(false);
                setInputTextActive(false);
              }}
              //  onActionCallback={callbackOnAction}
              card={cardSelection}
              variant={"Default"}
              disabled={false}
              children={renderButtonsCriteria(cardSelection)}
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
              variant={
                filterSelected !== "Default" ? "AgeCriteriaVar" : "Default"
              }
              disabled={false}
              //</div>variant={"Default"}
            >
              <div>
                <OptionSelectorGroup showHeaderError={false} />
              </div>
            </ModalContainer>
          </div>
        )}

        <div className="rectangle-bottom"></div>
      </div>
    </div>
  );
};
