import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { HeaderComp, HeaderCompProps } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Navigation/HeaderComp",
  component: HeaderComp,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends HeaderCompProps {
  darkMode: boolean;
}

const StoryHeaderComp: Story<Props> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args}>
      <HeaderComp open={open} toggleOpen={handleToggle} />
    </StoryLayout>
  );
};

export const Default = StoryHeaderComp.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["darkMode", "open", "toggleOpen"] },
};
