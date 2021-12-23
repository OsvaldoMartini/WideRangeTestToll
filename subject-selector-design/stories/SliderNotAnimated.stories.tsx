import React from "react";
import { Meta, Story } from "@storybook/react";
import {SliderNotAnimated} from "../src";


import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Sliders/SliderNotAnimated",
  component: SliderNotAnimated,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props  {
  darkMode: boolean;
}

const StoryDraggableCompGroup: Story<Props> = (args) => {
  // const [activeItem1, setActiveItem1] = React.useState<string>(
  //   options1[0].value,
  // );


  return (
    <StoryLayout {...args}>
        <SliderNotAnimated/>
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
