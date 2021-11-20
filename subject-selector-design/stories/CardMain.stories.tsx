import React from "react";
import { Meta, Story } from "@storybook/react";
import { CardMain } from "../src";
import StoryLayout from "./StoryLayout";
import { cardMains } from "../src/data";

const meta: Meta = {
  title: "BCSS-Design/Cards/CardMain",
  component: CardMain,
  argTypes: {
    cardMainTitle: {
      options: [cardMains[0].title, cardMains[1].title, cardMains[2].title, cardMains[3].title, cardMains[4].title, cardMains[5].title],
      control: { type: "radio" },
    },
    onClick: {action: 'clicked'},
  },
  parameters: {
    controls: { expanded: true },
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
  const cardMainIndex = cardMains.findIndex(
    (cardMain) => cardMain.title === args.cardMainTitle,
  );

  const cardMain = {
    ...cardMains[cardMainIndex],
    badge: args.open ? "+" : "",
  };

  return (
    <StoryLayout {...args}>
      <CardMain title={cardMain.title} onClick={() => {"I was clicked"}}/>
    </StoryLayout>
  );
};

export const Default = StoryCardMain.bind({});

Default.args = {
  darkMode: false,
  cardMainTitle: cardMains[0].title,
};

Default.parameters = {
  controls: { exclude: ["hidden comp"] },
};
