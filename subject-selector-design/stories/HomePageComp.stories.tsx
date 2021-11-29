import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import { HomePageComp, HomePageCompProps } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Navigation/HomePageComp",
  component: HomePageComp,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryHomePageComp: Story<HomePageCompProps> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args}>
      <HomePageComp variant={args.variant} />
    </StoryLayout>
  );
};

export const Default = StoryHomePageComp.bind({});

Default.args = {
  variant: "HoverActive",
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: [] },
};

Default.parameters = {
  controls: { exclude: ["darkMode", "open", "className", "disabled"] },
};
