import React from "react";
import { CardMain } from "../../components/cards/CardMain";
import { Header } from "./Header";
import { SubHeader } from "./SubHeader";
import { cardMains } from "../../data";
import { ICardMain } from "../../@interfaces";
import { ChooseCriteriaTittle } from "../labels/ChooseCriteriaTittle";
import { AnimationPlaceHolder } from "../placeholders/AnimationPlaceHolder";
import { ButtonSearch } from "../..";

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

  return (
    <div className="Desktop-HD-1440-Landing-Page">
      <Header open={true} toggleOpen={() => {}} />
      <hr className="divider-line" />
      <SubHeader open={true} toggleOpen={() => {}} />
      <div className="Desktop-Bar-Space" />
      {drawSpacerD10(0)}
      {cardMains.map((card: ICardMain, index: number) => {
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
              />
            </div>
            {middleSpacers((sum += spacerWidths[1]), index, cardMains.length)}
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
