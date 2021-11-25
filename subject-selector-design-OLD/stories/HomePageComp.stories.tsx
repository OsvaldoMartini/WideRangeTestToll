import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import { HomePageComp } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Navigation/HomePageComp",
  component: HomePageComp,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props {
  darkMode: boolean;
}

const StoryHomePageComp: Story<Props> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args} noPadding>
      <HomePageComp />
    </StoryLayout>
  );
};

export const Default = StoryHomePageComp.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: [] },
};
