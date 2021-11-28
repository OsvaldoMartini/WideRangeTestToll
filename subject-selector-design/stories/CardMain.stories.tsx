import React from "react";
import { Meta, Story } from "@storybook/react";
import { CardMain, CardMainProps } from "../src";
import StoryLayout from "./StoryLayout";
import { cardsData } from "../src/data";

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

// interface Props {
//   darkMode: boolean;
//   cardMainTitle: string;
//   open: boolean;
//   toggleOpen: () => void;
// }

const StoryCardMain: Story<CardMainProps> = (args) => {
  const cardMainIndex = cardsData.findIndex(
    (cardMain) => cardMain.title === args.title,
  );

  const cardMain = {
    ...cardsData[cardMainIndex],
  };

  return (
    <StoryLayout {...args}>
      <CardMain
        title={cardMain.title}
        variant={args.variant}
        className={args.className}
      />
    </StoryLayout>
  );
};

export const Default = StoryCardMain.bind({});

Default.args = {
  title: cardsData[0].title,
  variant: "Inactive",
  className: "bg",
  opacity: 1,
};

Default.parameters = {
  controls: { expanded: ["true"] },
  zeplinLink:
    "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a",
};

export const Secondary = StoryCardMain.bind({});

Secondary.args = {
  title: cardsData[1].title,
  variant: "HoverActive",
  className: "bg",
  opacity: 0.3,
};

Secondary.parameters = {
  controls: { expanded: ["true"] },
  zeplinLink:
    "zpl://components?stid=6166e46ef9e058b868df8688&coid=618166484bfc9d83bcb9593a",
};
