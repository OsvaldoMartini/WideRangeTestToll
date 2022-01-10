import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import { cardsData } from "../src/data";
import { CardButton, CardButtonProps } from "../src";

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
        addClassNames={args.addClassNames}
        addWidth={args.addWidth}
        addPlusPos={args.addPlusPos}
        variant={args.variant} 
        hoverClicked={false}      />
    </StoryLayout>
  );
};

export const SearchCriteria = StoryCardMain.bind({});

export const HoverCriteria = StoryCardMain.bind({});

export const HoverCriteriaClicked = StoryCardMain.bind({});


SearchCriteria.args = {
  title: cardsData[0].title,
  variant: "SearchCriteria",
  className: "button-search-criteria",
  addClassNames: "box-btn-criteria",
  opacity: 1,
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

HoverCriteria.args = {
  title: cardsData[0].title,
  width: "150",
  plusPos: "75",
  variant: "HoverCriteria",
  className: "hover-plus-criteria-button",
  addClassNames: "box-btn-criteria",
  opacity: 1,
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
      "addPlusPos",
      "addWidth",
      "onClick",
      "variant",
    ],
  },
  
    
};



HoverCriteriaClicked.args = {
  title: cardsData[0].title,
  width: "150",
  plusPos: "75",
  variant: "HoverCriteriaClicked",
  className: "hover-plus-criteria-button",
  addClassNames: "box-btn-criteria",
  opacity: 1,
};

HoverCriteriaClicked.parameters = {
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
