import React, { FC } from "react";
import { CardMain } from "../cards/CardMain";
import { HeaderComp } from "./HeaderComp";
import { SubHeader } from "./SubHeader";
import { ChooseCriteriaTittle } from "../labels/ChooseCriteriaTittle";
import { AnimationPlaceHolder } from "../placeholders/AnimationPlaceHolder";
import { ICardMainData } from "../../@interfaces/CardMainData.d";
import { ButtonSearch } from "../buttons/ButtonSearch";
import { cardsData } from "../../data";

type HomePageVariant = "Inactive" | "HoverActive";

export interface HomePageProps {
  children?: string | React.ReactElement;
  className?: string;
  variant: HomePageVariant;
  disabled?: boolean;
}

export const HomePage: FC<HomePageProps> = ({
  children,
  className,
  variant = "Inactive",
  disabled,
  ...homePageProps
}) => {
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

  var sum = 0;


  return (
    <div className="Desktop-HD-1440-Landing-Page">
      <HeaderComp open={true} toggleOpen={() => {}} />
      <hr className="divider-line" />
      <SubHeader open={true} toggleOpen={() => {}} />
      <div className="Desktop-Bar-Space" />
      {drawSpacerDs(0)}
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
                  addTopPos={`${sum}px`}
                  key={card.id}
                  title={card.title}
                  variant={variant}
                />
              </div>
              {middleSpacers((sum += spacerWidths[1]), index, cardsData.length)}
            </>
          );
        })}
      {drawSpacerDs (1)}
      <div className="choose-criteria-label-position">
        <ChooseCriteriaTittle open={true} toggleOpen={() => {}} />
      </div>
      <div className="main-place-holder-position">
        <AnimationPlaceHolder />
      </div>
      <div className="button-search-position">
        <ButtonSearch variant={"primary"} />
      </div>
    </div>
  );
};
