import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { AnimationPlaceHolder, AnimationPlaceHolderProps } from "../src";
import { navItemsTop, navItemsBottom } from "../src/data";
import { FiX } from "react-icons/fi";

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
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args} noPadding>
      <AnimationPlaceHolder open={open} toggleOpen={handleToggle} />
    </StoryLayout>
  );
};

export const Default = StoryAnimationPlaceHolder.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["open", "toggleOpen"] },
};
