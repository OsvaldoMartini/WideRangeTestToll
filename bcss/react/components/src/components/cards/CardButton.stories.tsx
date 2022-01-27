import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "../StoryLayout";
import { cardsData } from "../../data";
import { CardButton, CardButtonProps } from "./CardButton";

const meta: Meta = {
  title: "BCSS-Design/Cards/CardButton",
  component: CardButton,
  parameters: {
    controls: { expanded: true },


  },
};

export default meta;

const StoryCardMain: Story<CardButtonProps> = (args) => {
  const cardMainIndex = cardsData.findIndex(
    (cardMain) => cardMain.title === args.title,
  );

  const cardMain = {
    ...cardsData[cardMainIndex],
  };

  return (
    <StoryLayout {...args}>
      <CardButton
        title={args.title}
        subTitle={args.subTitle}
        addClassNames={args.addClassNames}
        addWidth={args.addWidth}
        addPlusPos={args.addPlusPos}
        variant={args.variant}
        hoverClicked={false}
        mainCardPage={args.mainCardPage}
        opacity={args.opacity}
      //className={args.className}
      />
    </StoryLayout>
  );
};

export const Default = StoryCardMain.bind({});

export const HoverCriteria = StoryCardMain.bind({});

export const SearchCriteria = StoryCardMain.bind({});

export const HoverSearchCriteria = StoryCardMain.bind({});

export const SearchCriteriaClicked = StoryCardMain.bind({});

export const CardWithFilter = StoryCardMain.bind({});


Default.args = {
  title: cardsData[0].title,
  variant: "InitialState",
  mainCardPage: true,
  opacity: 1,
  className: "bg",
  addClassNames: "box-card",
};

Default.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "className",
      "opacity",
      "disabled",
      "addClassNames",
      "addLeftPos",
      "addTopPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },
};

HoverCriteria.args = {
  title: cardsData[0].title,
  variant: "HoverCriteria",
  mainCardPage: true,
  opacity: 0.3,
  className: "bg",
  addClassNames: "box-card",
};

HoverCriteria.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "className",
      "opacity",
      "disabled",
      "addClassNames",
      "addLeftPos",
      "addTopPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },
};


SearchCriteria.args = {
  title: cardsData[0].title,
  variant: "SearchCriteria",
  mainCardPage: false,
  opacity: 0,
  className: "button-search-criteria",
  addClassNames: "box-card",
  addWidth: 130,
  addTopPos: "10px"
};

SearchCriteria.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "className",
      "opacity",
      "disabled",
      "addClassNames",
      "addLeftPos",
      "addTopPos",
      "addPlusPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },


};



SearchCriteriaClicked.args = {
  title: cardsData[0].title,
  variant: "SearchCriteriaClicked",
  mainCardPage: false,
  opacity: 1,
  className: "hover-plus-criteria-button",
  addClassNames: "box-card",
  addWidth: 130,
  addTopPos: "10px",
  plusPos: "55px",
};

SearchCriteriaClicked.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "className",
      "opacity",
      "disabled",
      "addClassNames",
      "addLeftPos",
      "addTopPos",
      "addPlusPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },
};

HoverSearchCriteria.args = {
  title: cardsData[0].title,
  variant: "HoverSearchCriteria",
  mainCardPage: false,
  opacity: 0,
  className: "hover-plus-criteria-button",
  addClassNames: "box-card",
  addWidth: 130,
  addTopPos: "10px",
  plusPos: "55px",
};

HoverSearchCriteria.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "className",
      "opacity",
      "disabled",
      "addClassNames",
      "addLeftPos",
      "addTopPos",
      "addPlusPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },


};




CardWithFilter.args = {
  title: cardsData[0].criteriaOptions[0].filterName,
  subTitle: "333 333 4444",
  variant: "CardWithFilter",
  mainCardPage: false,
  opacity: 1,
  className: "card-with-age-filter",
  addClassNames: "box-card",
  addWidth: 153,
  addTopPos: "10px",
  plusPos: "55px",
};

CardWithFilter.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "className",
      "opacity",
      "disabled",
      "addClassNames",
      "addLeftPos",
      "addTopPos",
      "addPlusPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },


};
