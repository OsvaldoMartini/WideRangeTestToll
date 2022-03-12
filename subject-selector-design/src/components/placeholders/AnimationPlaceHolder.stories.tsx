import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "../StoryLayout";
import { AnimationPlaceHolder, AnimationPlaceHolderProps } from "./AnimationPlaceHolder";

const meta: Meta = {
  title: "BCSS-Design/Place Holders/AnimationPlaceHolder",
  component: AnimationPlaceHolder,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends AnimationPlaceHolderProps {
  darkMode: boolean;
}

const StoryAnimationPlaceHolder: Story<Props> = (args) => {
  return (
    <StoryLayout {...args}>
      <AnimationPlaceHolder stopAnimation={false} />
    </StoryLayout>
  );
};

export const Default = StoryAnimationPlaceHolder.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["darkMode", "error", "disabled"] },
};
