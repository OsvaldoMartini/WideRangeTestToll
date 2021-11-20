import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { Navbar, NavbarProps, SideNav } from "../src";
import { navItemsTop, navItemsBottom, Figma } from "../src/data";
import { FiX } from "react-icons/fi";

const meta: Meta = {
  title: "BCSS-Design/Navigation/NavBar",
  component: Navbar,
  parameters: {
    controls: { expanded: true },
    design: {
      type: "figma",
      url: Figma.Navbar,
    },
  },
};

export default meta;

interface Props extends NavbarProps {
  darkMode: boolean;
}

const StoryNavbar: Story<Props> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args} noPadding>
       <Navbar open={open} toggleOpen={handleToggle} />
    </StoryLayout>
  );
};

export const Default = StoryNavbar.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["open", "toggleOpen"] },
};
