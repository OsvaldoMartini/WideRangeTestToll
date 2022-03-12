import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "../StoryLayout";
import { ChooseCriteriaTittle, ChooseCriteriaTittleProps } from "./ChooseCriteriaTittle";

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
    <StoryLayout {...args}>
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
  controls: { exclude: ["darkMode", "open", "toggleOpen"] },
};