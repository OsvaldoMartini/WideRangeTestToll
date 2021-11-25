import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { ChooseCriteriaTittle, ChooseCriteriaTittleProps } from "../src";
import { navItemsTop, navItemsBottom, Figma } from "../src/data";
import { FiX } from "react-icons/fi";

const meta: Meta = {
  title: "BCSS-Design/Labels/ChooseCriteriaTittle",
  component: ChooseCriteriaTittle,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends ChooseCriteriaTittleProps {
  darkMode: boolean;
}

const StoryChooseCriteriaTittle: Story<Props> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args} noPadding>
      <ChooseCriteriaTittle open={open} toggleOpen={handleToggle} />
    </StoryLayout>
  );
};

export const Default = StoryChooseCriteriaTittle.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["open", "toggleOpen"] },
};
