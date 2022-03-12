import React from "react";
import { Meta, Story } from "@storybook/react";
import { CardMain, CardMainProps } from "./CardMain";
import StoryLayout from "../StoryLayout";
import { cardsData } from "../../data";

const meta: Meta = {
  title: "BCSS-Design/Cards/CardMain",
  component: CardMain,
  parameters: {
    controls: { expanded: true },
    zeplinLink:
      "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a",
  },
};

export default meta;

const StoryCardMain: Story<CardMainProps> = (args) => {
  // const cardMainIndex = cardsData.findIndex(
  //   (cardMain) => cardMain.title === args.title,
  // );

  // const cardMain = {
  //   ...cardsData[cardMainIndex],
  // };

  return (
    <StoryLayout {...args}>
      <CardMain
        title={args.title}
        variant={args.variant}
        className={args.className}
      />
    </StoryLayout>
  );
};

export const Default = StoryCardMain.bind({});

export const HoverCriteria = StoryCardMain.bind({});

Default.args = {
  title: CardMain[0].title,
  variant: "InitialState",
  className: "card-main-button",
  opacity: 1,
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
  className: "card-main-button",
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
      "addWidth",
      "onClick",
      "variant",
    ],
  },
};
