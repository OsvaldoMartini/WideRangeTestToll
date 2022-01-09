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
    zeplinLink:
      "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a",
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
      />
    </StoryLayout>
  );
};

export const SearchCriteria = StoryCardMain.bind({});

export const HoverCriteria = StoryCardMain.bind({});

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
  zeplinLink:
    "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a",
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
  zeplinLink:
    "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9???",
};
