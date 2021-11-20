import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { Header, HeaderProps } from "../src";
import { navItemsTop, navItemsBottom, Figma } from "../src/data";
import { FiX } from "react-icons/fi";

const meta: Meta = {
  title: "BCSS-Design/Navigation/Header",
  component: Header,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends HeaderProps {
  darkMode: boolean;
}

const StoryHeader: Story<Props> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args} noPadding>
      <Header open={open} toggleOpen={handleToggle} />
    </StoryLayout>
  );
};

export const Default = StoryHeader.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["open", "toggleOpen"] },
};
