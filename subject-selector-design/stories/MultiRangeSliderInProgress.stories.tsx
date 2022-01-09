import React , {ChangeEvent} from "react";
import { Meta, Story } from "@storybook/react";
import { MultiRangeSliderInProgress, MultiRangeSliderInProgressProps } from "../src";

import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Sliders/MultiSliderRollerInProgress",
  component: MultiRangeSliderInProgress,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryMultSliderInProgressGroup: Story<MultiRangeSliderInProgressProps> = (args) => {
  return (
    <StoryLayout {...args}>
        <MultiRangeSliderInProgress
        min={1}
        max={120}
        variant={"Active"} 
        />
    </StoryLayout>
  );
};

export const InProgress = StoryMultSliderInProgressGroup.bind({});

InProgress.args = {
  darkMode: false,
};

InProgress.parameters = {
  controls: { exclude: ["darkMode", "min" ,"max", ] },
};
