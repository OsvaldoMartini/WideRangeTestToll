import React from "react";
import { CardMain } from "../../components/cards/CardMain";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { ChooseCriteriaTittle } from "../labels/ChooseCriteriaTittle";
import { AnimationPlaceHolder } from "../placeholders/AnimationPlaceHolder";
import { ButtonSearch, ICardMainData } from "../..";

export const HomePage = () => {
  const spacerD10 = [176, 1204];
  const spacerWidths = [64, 154, 8];

  const drawSpacerD10 = (idx: number) => {
    return (
      <div className="box-set">
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

  var sum = 0;

  const cardMain0: ICardMainData = {
    id: 0,
    title: "Demographic",
    subtitle: "Demo",
    badge: "Exclusive deal",
    onClick: () => {
      `I clicked Demographic`;
    },
  };

  const cardMain1: ICardMainData = {
    id: 1,
    title: "Episode",
    subtitle: "Epi",
    badge: "",
    onClick: () => {
      `I clicked Episode`;
    },
  };

  const cardMain2: ICardMainData = {
    id: 2,
    title: "Screening",
    subtitle: "Scre",
    badge: "",
    onClick: () => {
      `I clicked Screening`;
    },
  };

  const cardMain3: ICardMainData = {
    id: 3,
    title: "Diagnostic",
    subtitle: "Diag",
    badge: "",
    onClick: () => {
      `I clicked Diagnostic`;
    },
  };
  const cardMain4: ICardMainData = {
    id: 4,
    title: "Kit Status",
    subtitle: "Kit",
    badge: "",
    onClick: () => {
      `I clicked Kit Status`;
    },
  };
  const cardMain5: ICardMainData = {
    id: 5,
    title: "Surveillance",
    subtitle: "Scre",
    badge: "",
    onClick: () => {
      `I clicked Surveillance`;
    },
  };

  const cardsData: ICardMainData[] = [
    cardMain0,
    cardMain1,
    cardMain2,
    cardMain3,
    cardMain4,
    cardMain5,
  ];

  return (
    <div className="Desktop-HD-1440-Landing-Page">
      <Header open={true} toggleOpen={() => {}} />
      <hr className="divider-line" />
      <SubHeader open={true} toggleOpen={() => {}} />
      <div className="Desktop-Bar-Space" />
      {drawSpacerD10(0)}
      {cardsData &&
        cardsData.map((card: ICardMainData, index: number) => {
          if (index === 0) {
            sum += spacerD10[index] + spacerWidths[0];
            console.log(sum, "initial");
          } else {
            sum += spacerWidths[2];
            console.log(sum, "Blocks");
          }
          return (
            <>
              <div>
                <CardMain
                  addClassNames={`box-${index} `}
                  addLeftPos={`${sum}px`}
                  key={card.id}
                  title={card.title}
                  onClick={card.onClick}
                  variant={"primary"}
                />
              </div>
              {middleSpacers((sum += spacerWidths[1]), index, cardsData.length)}
            </>
          );
        })}
      {drawSpacerD10(1)}
      <div className="choose-criteria-label-position">
        <ChooseCriteriaTittle open={true} toggleOpen={() => {}} />
      </div>
      <div className="main-place-holder-position">
        <AnimationPlaceHolder open={true} toggleOpen={() => {}} />
      </div>
      <div className="button-search-position">
        <ButtonSearch variant={"primary"} />
      </div>
    </div>
  );
};
