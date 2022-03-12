import React from "react";
import { Meta, Story } from "@storybook/react";
import { SliderNotAnimated } from "./SliderNotAnimated";


import StoryLayout from "../StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Sliders/SliderNotAnimated",
  component: SliderNotAnimated,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props {
  darkMode: boolean;
}

const StoryDraggableCompGroup: Story<Props> = (args) => {

  return (
    <StoryLayout {...args}>
      <SliderNotAnimated />
    </StoryLayout>
  );
};

export const Default = StoryDraggableCompGroup.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["active", "setActive", "options", "darkMode"] },
};
