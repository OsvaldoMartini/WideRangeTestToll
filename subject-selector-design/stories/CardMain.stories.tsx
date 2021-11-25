import React from "react";
import { Meta, Story } from "@storybook/react";
import { CardMain } from "../src";
import StoryLayout from "./StoryLayout";
import { cardsData } from "../src/data";

const meta: Meta = {
  title: "BCSS-Design/Cards/CardMain",
  component: CardMain,
  argTypes: {
    cardMainTitle: {
      options: [
        cardsData[0].title,
        cardsData[1].title,
        cardsData[2].title,
        cardsData[3].title,
        cardsData[4].title,
        cardsData[5].title,
      ],
      control: { type: "radio" },
    },
    onClick: { action: "clicked" },
  },
  parameters: {
    controls: { expanded: true },
    zeplinLink: "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a"

  },
};

export default meta;

interface Props {
  darkMode: boolean;
  cardMainTitle: string;
  open: boolean;
  toggleOpen: () => void;
}

const StoryCardMain: Story<Props> = (args) => {
  const cardMainIndex = cardsData.findIndex(
    (cardMain) => cardMain.title === args.cardMainTitle,
  );

  const cardMain = {
    ...cardsData[cardMainIndex],
    badge: args.open ? "+" : "",
  };

  return (
    <StoryLayout {...args}>
      <CardMain
        title={cardMain.title}
        onClick={() => {
          "I was clicked";
        }}
        variant={"primary"}
      />
    </StoryLayout>
  );
};

export const Default = StoryCardMain.bind({});

Default.args = {
  darkMode: false,
  cardMainTitle: cardsData[0].title,
};

Default.parameters = {
  controls: { expanded: ["true"] },
  zeplinLink: "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a"
};
