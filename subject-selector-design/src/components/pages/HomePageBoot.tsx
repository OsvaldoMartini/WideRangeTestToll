import React, { FC, useState, useEffect } from "react";
import { AnimationPlaceHolder } from "../placeholders/AnimationPlaceHolder";
import { cardsData } from "../../data";
import { ModalContainer } from "../modals/ModalContainer";
import { ButtonComp } from "../buttons/ButtonComp";
import { ICardMainData } from "../@interfaces";
import { CardButton } from "../cards/CardButton";
import { OptionSelectorGroup } from "../options/OptionSelectorGroup";
import { TextInput3DigActive } from "../textinput/TextInput3DigActive";
import { FilterSelectionGroup } from "../filtersSelection/FiltersSelectionGroup";
import { CustomPagination } from "../navigation/CustomPagination";
//import optionReducer from "../../stores/OptionSelectedReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames";
import { CardTotal } from "../cards/CardTotal";
import { SubjectSearchService } from "../services/SubjectSearch/SubjectSearchService";


type HomePageBootVariant = "InitialState" | "HoverCriteria";

export interface HomePageBootProps {
  children?: string | React.ReactElement;
  title: string;
  className?: string;
  variant: HomePageBootVariant;
  disabled?: boolean;
  changeValues: (value: any) => void;
}

export const HomePageBoot: FC<HomePageBootProps> = ({
  children,
  title = "Search",
  className,
  variant = "InitialState",
  disabled,
  changeValues,
  ...homePageBootProps
}) => {

  //const [state, dispatch] = useReducer(optionReducer, { buttonSubmit: true });

  const [cardSelection, setCardSelection] = useState<any>([]);
  const [groupButtons, setGroupButtons] = useState<any>([]);

  const [modalCriteriaActive, setModalCriteriaActive] = useState(false);
  const [modalFilterAgeCriteria, setModalFilterAgeCriteria] = useState(false);
  const [selectAgeCriteria, setSelectAgeCriteria] = useState(false);
  const [filterSelected, setFilterSelected] = useState({ action: "CategoryNhsNumber", title: "NHS Number", filterName: "NHS Number" });
  const [inputTextActive, setInputTextActive] = useState(false);
  const [stopPlaceAnimation, setStopAnimation] = useState(false);
  const [showLabelValues, setShowLabelValues] = useState(false);
  const [valueTextAge, setValueTextAge] = useState("");
  const [activeAddCriterion, setActiveAddCriterion] = useState(false);

  // const [disableButtons, setDisableButtons] = useState(false);
  const [betweenOperation, setBetweenOperation] = useState(false);
  const [optionSelected, setOptionSelected] = useState({ id: 1, title: "Specific age", short: "Specific age", operation: "equal", category: "CategoryAges" });
  const [valuesAge, setValuesAge] = useState({ minAge: 1, maxAge: 120 });
  const [previousValues, setPreviousValues] = useState(valuesAge);

  //  const [minAgeValue, setMinAgeValue] = useState(0);
  //   const [maxAgeValue, setMaxAgeValue] = useState(50);

  const [alterOrDelete, setAlterOrDelete] = useState(false);

  const [hasFilters, setHasFilters] = useState(false);


  const [filtersApplied, setFiltersApplied] = useState(false);

  const [filtered, setFiltered] = useState<any[]>([]);

  const addCriterion = (cardSelection: ICardMainData) => {
    console.log("addCriterion")

    if (!cardSelection.filtersSelection) {
      cardSelection.filtersSelection = [];
    }

    console.log("cardSelection", optionSelected);
    if (filterSelected.action === "CategoryAges") {

      let existOper = cardSelection.filtersSelection.filter((item) => {
        return item.category === optionSelected.category;
      });

      if (existOper.length > 0) {
        cardSelection.filtersSelection.map((item) => {
          if (item.category === optionSelected.category) {
            item.title = optionSelected.short || optionSelected.title;
            item.subTitle = optionSelected.operation === "between" ? `${valuesAge.minAge}-${valuesAge.maxAge}` : `${valuesAge.minAge}`;
            item.operation = optionSelected.operation;
            item.minAgeValue = valuesAge.minAge;
            item.maxAgeValue = valuesAge.maxAge;

          }
        });

      } else {

        cardSelection.filtersSelection.push(
          {
            id: cardSelection.filtersSelection.length + 1,
            title: optionSelected.short || optionSelected.title,
            subTitle: optionSelected.operation === "between" ? `${valuesAge.minAge}-${valuesAge.maxAge}` : `${valuesAge.minAge}`,
            operation: optionSelected.operation,
            category: optionSelected.category,
            minAgeValue: valuesAge.minAge,
            maxAgeValue: valuesAge.maxAge,
          });
      }
    } else if (filterSelected.action === "CategoryNhsNumber") {
      let existOper = cardSelection.filtersSelection.filter((item) => {
        return item.category === filterSelected.action;
      });

      if (existOper.length > 0) {
        cardSelection.filtersSelection.map((item) => {
          if (item.category === filterSelected.action) {
            item.title = filterSelected.title;
            item.subTitle = "";
            item.operation = "equals";
            item.nhsNumber = String(valueTextAge);
          }
        });

      } else {

        cardSelection.filtersSelection.push(
          {
            id: cardSelection.filtersSelection.length + 1,
            title: filterSelected.title,
            subTitle: "",
            operation: "equals",
            category: filterSelected.action,
            nhsNumber: String(valueTextAge)
          });
      }
    }
    setHasFilters(true);
  };


  useEffect(() => {
    if (valueTextAge.length > 0) {
      setActiveAddCriterion(true);
    } else {
      setActiveAddCriterion(false);
      console.log("valueTextAge EMPTY ", valueTextAge)
    }
  }, [valueTextAge]);

  const callSearch = () => {
    console.log("callSearch", filtered);

    console.log("filtersSelection", cardSelection.filtersSelection);
    let searchAge = cardSelection.filtersSelection.filter((item: any) => {
      return item.category === "CategoryAges";
    })[0];

    let searchNhsNumber = cardSelection.filtersSelection.filter((item: any) => {
      return item.category === "CategoryNhsNumber";
    })[0];

    if (searchAge) {
      searchAge.rangeAge = searchAge.subTitle.split("-");

      if (searchAge.operation === "<=") {
        searchAge.operation = "lessorequalthan";
      } else if (searchAge.operation === ">=") {
        searchAge.operation = "greaterorequalthan";
      } else if (searchAge.operation === "<") {
        searchAge.operation = "lessthan";
      } else if (searchAge.operation === ">") {
        searchAge.operation = "greaterthan";
      } else if (searchAge.operation === "equal") {
        searchAge.operation = "equal";
      }
    }

    const response = SubjectSearchService({
      category: searchAge ? searchAge.category : searchNhsNumber ? searchNhsNumber.category : null,
      nhsNumber: searchNhsNumber ? searchNhsNumber.nhsNumber.replace(/[^0-9]/g, "") : null,
      operation: searchAge ? searchAge.operation : searchNhsNumber ? searchNhsNumber.operation : null,
      minAge: searchAge ? searchAge.rangeAge[0] : null,
      maxAge: searchAge && searchAge.rangeAge.length > 1 ? searchAge.rangeAge[1] : null,
      changeData: (filtered: any) => {
        setFiltersApplied(true);
        setFiltered(filtered);
      },
    }).then(responses => {
      console.log("responses ", responses);
    });
    console.log("responses ", response);

  };

  useEffect(() => {
    if (filtered && filtersApplied) {
      setFiltersApplied(true);
      //      console.log("Response", filtered)
    }
  }, [filtered]);

  const closeSearch = () => {
    setFiltersApplied(false);
  }


  const setLabelValues = () => {
    //    console.log("values", valuesAge.minAge)

    if (valuesAge.minAge >= 0 || valuesAge.maxAge <= 120) {
      setShowLabelValues(true);
    } else {
      setShowLabelValues(false);
    }
  };

  const spacerD10 = [0, 1204];
  const spacerWidths = [64, 154, 8];

  // const drawSpacerDs = (idx: number) => {
  //   return (
  //     <figure {...homePageBootProps}
  //       className={"box-D10 D10-pos"}
  //       style={{ left: `${spacerD10[idx]}px` }}
  //     >

  //     </figure>

  //   );
  // };

  // const middleSpacers = (posIndex: number, index: number, limit: number) => {
  //   if (index < limit - 1) {
  //     return (
  //       <div>
  //         <figure
  //           className={"box-D2 D2-pos"}
  //           style={{ left: `${posIndex}px` }}
  //         ></figure>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  const subjectSelected = (butt: any) => {
    //setFilterAction(butt.action);
    setFilterSelected(butt);

    groupButtons.map((button: any) => {
      if (butt.id !== button.id) {
        button.hoverClicked = false;
      } else {
        button.hoverClicked = true;
      }
    });

    //    console.log("butt.action", butt.action)
    if (butt.action !== undefined && butt.action === "CategoryAges") {
      setInputTextActive(false);
      setSelectAgeCriteria(true);
      setActiveAddCriterion(false);
    } else if (butt.action !== undefined && butt.action === "CategoryNhsNumber") {
      setSelectAgeCriteria(false);
      if (valueTextAge.length > 0) {
        setActiveAddCriterion(true);
      }
      setInputTextActive(true);
    } else {
      setSelectAgeCriteria(false);
      setInputTextActive(true);
    }
  };


  const handleCardSelection = (card: any) => {
    console.log(card)
    setStopAnimation(true);
    setCardSelection(card);
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

    if (modalCriteriaActive) {
      console.log(cardSelection);

      let buttonsCriteria = cardSelection && cardSelection.criteriaOptions.map((item: any) => {
        //if (index === 0) {
        let dynWidth = getTextWidth(item.title);
        let box_pos = sum + dynWidth;
        let left_pos = sum;
        sum += dynWidth + spacerWidths[0];
        let plus_pos = Math.abs(dynWidth / 2) - 2;  //+ left_pos;
        // console.log(
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
      //     console.log(buttonsCriteria);

    }
  }


  useEffect(() => {
    if (optionSelected.operation !== "between") {
      setBetweenOperation(false)
    } else {
      setBetweenOperation(true);
    }
  }, [valuesAge]);

  useEffect(() => {

  }, [modalCriteriaActive]);


  useEffect(() => {
    setInitialCard();
  }, [cardSelection]);

  const deleteCriteria = () => {
    setInitialCard();
    setShowLabelValues(false);
    setSelectAgeCriteria(false);
    setInputTextActive(false);
  }


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
      //console.log(e.key);
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
          <div className="box-subject-criteria-selected"
            onMouseEnter={() => {
              setAlterOrDelete(true);
            }}
            onMouseLeave={() => {
              setAlterOrDelete(false);
            }}>
            <div className="label-criteria-selected-position">
              <div className="label-criteria-selected">{filterSelected.filterName}</div>
            </div>
            {showLabelValues && (
              <div>
                {/* <div className="label-age-title-position">
                  <div className="label-age-title">{optionSelected.title}</div>
                </div> */}
                {/* {betweenOperation && (<div className="label-age-values-position"> */}
                {betweenOperation && (<div className="label-age-title-position">
                  <div className="label-age-values">
                    {optionSelected.title}  {valuesAge.minAge}-{valuesAge.maxAge}</div></div>)}
                {/* {!betweenOperation && (<div className="label-age-values-position"> */}
                {!betweenOperation && (<div className="label-age-title-position">
                  <div className="label-age-values">
                    {optionSelected.title}  {valuesAge.minAge}</div></div>)}
              </div>
            )}
            {alterOrDelete && (
              <div style={{ position: "relative" }}>
                <div className="alter-or-delete-criteria-position">
                  {showLabelValues && (
                    <div style={{ position: "absolute", left: "5px" }}>
                      <svg style={{ cursor: "pointer" }} width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setModalFilterAgeCriteria(true);
                        }}
                      >
                        <title>Icons/32/edit/edit_blue</title>
                        <g id="Icons/32/edit/edit_blue" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <path d="M18.8937876,12 L20,13.1062124 L9.10621242,24 L8,24 L8,22.8937876 L18.8937876,12 M23.0157514,5 C22.7177522,5 22.4078331,5.11925043 22.1813538,5.34582624 L20,7.52810903 L24.4699872,12 L26.651341,9.81771721 C27.1162197,9.35264055 27.1162197,8.60136286 26.651341,8.1362862 L23.862069,5.34582624 C23.6236696,5.10732538 23.3256705,5 23.0157514,5 Z M18.4422687,9 L5,22.4422687 L5,27 L9.55773126,27 L23,13.5577313 L18.4422687,9 Z" id="Shape" fill="#005EB8" fillRule="nonzero"></path>
                        </g>
                      </svg>
                    </div>
                  )}
                  <div style={{ position: "absolute", left: "40px" }}>
                    <svg style={{ cursor: "pointer" }} onClick={() => deleteCriteria()} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24 11-1.2 15.308c-.075.954-.946 1.692-1.996 1.692h-9.608c-1.05 0-1.92-.738-1.995-1.692L8 11h16zm-5-7c.552 0 1 .47 1 1.05V7h5a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h5V5.05c0-.58.448-1.05 1-1.05h6zm-1 2h-4v1h4V6z" fill="#DA291C" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
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
        {inputTextActive && (
          <div className="box-subject-criteria-selected"
            onMouseEnter={() => {
              setAlterOrDelete(true);
            }}
            onMouseLeave={() => {
              setAlterOrDelete(false);
            }}>
            <div className="label-criteria-selected-position">
              <div className="label-criteria-selected">{filterSelected.filterName}</div>
            </div>
            <div className="nhs-number-input-position">
              <TextInput3DigActive
                type={"text"}
                value={valueTextAge}
                onChange={function (
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void {
                  setValueTextAge(event.target.value);
                }}
                onKeyDown={(_event) => {
                  handleTypeTextAge(_event);
                }}
                variant={"NHSNumber"}
              />
            </div>
            <div style={{ position: "relative" }}>
              <div className="info-nhs-number-criteria-position">
                <svg style={{ cursor: "pointer" }} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 11h2v2h-2v-2zm0 4h2v6h-2v-6zm1-9C10.48 6 6 10.48 6 16s4.48 10 10 10 10-4.48 10-10S21.52 6 16 6zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#111" fillRule="nonzero" />
                </svg>
              </div>
            </div>
            {alterOrDelete && (
              <div style={{ position: "relative" }}>
                <div className="alter-or-delete-criteria-position">
                  <div style={{ position: "absolute", left: "5px" }}>
                    <svg style={{ cursor: "pointer" }} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.913 8.367a1.204 1.204 0 0 1 1.728-.002 1.27 1.27 0 0 1 .103 1.648l-.101.118-13.016 13.323a1.805 1.805 0 0 1-2.453.123l-.14-.128-5.678-5.826a1.268 1.268 0 0 1 .004-1.766 1.203 1.203 0 0 1 1.613-.1l.115.103 5.245 5.382 12.58-12.875z" fill="#009639" fillRule="nonzero" />
                    </svg>
                  </div>
                  <div style={{ position: "absolute", left: "40px" }}>
                    <svg style={{ cursor: "pointer" }} onClick={() => deleteCriteria()} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="m24 11-1.2 15.308c-.075.954-.946 1.692-1.996 1.692h-9.608c-1.05 0-1.92-.738-1.995-1.692L8 11h16zm-5-7c.552 0 1 .47 1 1.05V7h5a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h5V5.05c0-.58.448-1.05 1-1.05h6zm-1 2h-4v1h4V6z" fill="#DA291C" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


      </div >
    );
  };

  var sum = 0;

  //  console.log("Values Home Page:", valuesAge.minAge + " - " + valuesAge.maxAge)

  return (

    <div {...homePageBootProps} className="App">
      <header className="App-header">
        <hr className="divider-line-boot"></hr>

        <span className="header-bar-title-boot">BCS - Test Subject Finder </span>
        {/* <div className="header-bar-box" style={{ position: "relative" }}> */}
        <div className="header-bar-logo-boot">
          <div>
            <svg style={{ cursor: "pointer" }}
              width="98"
              height="40"
              viewBox="0 0 98 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path fill="#FFF" d="M0 40h98V0H0z" />
                <path
                  fill="#005EB8"
                  d="M9.548 3.817H20.16l6.52 22.08h.09l4.465-22.08h8.021l-6.74 31.84H21.939l-6.65-22.032h-.09l-4.424 22.031H2.754l6.794-31.84M42.4 3.817h8.518l-2.502 12.18h10.069l2.508-12.18h8.519l-6.61 31.84h-8.518l2.826-13.638H47.135L44.31 35.656h-8.518L42.4 3.816M91.93 11.025c-1.64-.773-3.873-1.457-7.016-1.457-3.37 0-6.106.498-6.106 3.056 0 4.512 12.35 2.828 12.35 12.499 0 8.802-8.16 11.085-15.54 11.085-3.281 0-7.065-.78-9.842-1.648l2.006-6.477c1.682 1.096 5.058 1.827 7.835 1.827 2.646 0 6.789-.503 6.789-3.786 0-5.111-12.35-3.194-12.35-12.176 0-8.214 7.202-10.676 14.176-10.676 3.92 0 7.608.413 9.75 1.413l-2.052 6.34"
                />
              </g>
            </svg>
            {/* </div> */}
          </div>
        </div>

        <text className="text-white header-bar-title" />


      </header>
      {modalCriteriaActive && <div className="main-disabled navbar-expand-md" />}
      <body className="body-set-boot">
        <section >
          <div className="container" style={{ paddingTop: "56px" }}>
            {cardsData &&
              cardsData.map((card: ICardMainData, index: number) => {
                if (index === 0) {
                  sum += spacerD10[index] + spacerWidths[0];
                } else {
                  sum += spacerWidths[2];
                }

                let totFilter = card.filtersSelection && card.filtersSelection.length ? card.filtersSelection.length : 0;

                return (
                  <div>
                    <div key={`_${card.id}`} style={{ position: "relative" }}>
                      <CardButton
                        classNamePlus={"hover-plus-criteria-button-boot"}
                        addClassNames={``}
                        addLeftPos={`inherit`}
                        addTopPos={"24px"}
                        key={`card_${card.id}`}
                        title={card.title}
                        variant={"BootstrapCriteria"}
                        buttCriteria={card}
                        opacity={"40%"}
                        onClick={() => {
                          handleCardSelection(card);
                        }}
                      />
                      {!filtersApplied && totFilter > 0 && (
                        <CardTotal totFilterProp={totFilter} leftProps={sum} />

                      )}

                      {/* {middleSpacers(
                      (sum += spacerWidths[1]),
                      index,
                      cardsData.length,
                    )} */}
                    </div>

                    {
                      !filtersApplied && (
                        <FilterSelectionGroup
                          variant={"InitialState"}
                          filters={card.filtersSelection}
                          initialPosition={194 + 128}
                          addLeftPos={`${sum - spacerWidths[1]}`}
                          bootstrap={true}
                        />)
                    }

                  </div>
                );
              })}
          </div>
        </section>
        {filtersApplied && (
          <div>
            <CustomPagination data={filtered} itemsPerPage={20} />
          </div>
        )}
        {!filtersApplied && !hasFilters && (
          <div className="padding-choose-criteria">
            <span className="choose-criteria-label-boot">Choose 1 or more criteria to start your search</span>
          </div>
        )}
        {!filtersApplied && !hasFilters && (
          <div className="main-place-holder-position-boot">
            <AnimationPlaceHolder stopAnimation={stopPlaceAnimation} />
          </div>
        )}

        <div
          // className="button-search-position-boot" 
          className={classNames("", {
            ["button-search-position-boot"]: !filtersApplied,
            ["button-search-position-boot-padding"]: filtersApplied,
          })}

        >
          {/* <button className="choose-criteria-label">Search</button> */}
          <ButtonComp
            title={!filtersApplied ? title : "New Search"}
            variant={!filtersApplied ? "ButtonMainPage" : "ButtonCancelSearch"}
            disabled={!hasFilters}
            onClick={() => {
              { !filtersApplied && callSearch() };
              { filtersApplied && closeSearch() };
              // onActionCallback!(butt.action);
              // setCardSelection(card);
              // setModalCriteriaActive(true);
            }} />
        </div>




      </body>

      <footer>




      </footer>
      {modalCriteriaActive && cardSelection! && (
        <div>
          <ModalContainer
            show={modalCriteriaActive}
            titleOK="Add criterion"
            onOkay={() => addCriterion(cardSelection)}
            onHide={() => {
              setInitialCard();
              setShowLabelValues(false);
              setModalCriteriaActive(false);
              setSelectAgeCriteria(false);
              setStopAnimation(false);
              setInputTextActive(false);
              setValuesAge(previousValues);
            }}
            //  onActionCallback={callbackOnAction}
            card={cardSelection}
            variant={"Default"}
            disabled={false}
            children={renderButtonsCriteria()}
            okayDisabled={!showLabelValues && !activeAddCriterion}
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
            titleOK="Okay"

            show={modalFilterAgeCriteria}
            onOkay={() => {
              setLabelValues()
            }
            }
            onHide={() => {
              setModalFilterAgeCriteria(false);
              //setValuesAge(previousValues);
            }}
            variant={
              filterSelected.action !== "CategoryNhsNumber" ? "CategoryAges" : "Default"
            }
            disabled={false}
            okayDisabled={false}

          //</div>variant={"Default"}
          >
            <div>
              <OptionSelectorGroup
                changeValuesAge={(valuesAge: any) => setValuesAge(valuesAge)}
                changeOptions={(optionSelected: any) => setOptionSelected(optionSelected)}
                valueAgeInit={valuesAge}
                optionsInit={optionSelected}
              />
            </div>
          </ModalContainer>
        </div>
      )}

      <div className="rectangle-bottom"></div>
    </div>

  );
};
