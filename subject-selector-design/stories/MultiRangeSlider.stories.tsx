import React , {ChangeEvent} from "react";
import { Meta, Story } from "@storybook/react";
import { MultiRangeSlider, MultiRangeSliderProps } from "../src";

import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Sliders/MultiSliderRoller",
  component: MultiRangeSlider,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props  {
  darkMode: boolean;
}



const StoryDraggableCompGroup: Story<MultiRangeSliderProps> = (args) => {

  return (
    <StoryLayout {...args}>
         <MultiRangeSlider
        min={0}
        max={120}
        variant={"Active"} 
        />
    </StoryLayout>
  );
};

export const Default = StoryDraggableCompGroup.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["darkMode", "min" ,"max", ] },
};
