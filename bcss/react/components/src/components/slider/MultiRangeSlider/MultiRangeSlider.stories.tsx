import React from "react";
import { Meta, Story } from "@storybook/react";
import { MultiRangeSlider, MultiRangeSliderProps } from "./MultiRangeSlider";

import StoryLayout from "../../StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Sliders/MultiSliderRoller",
  component: MultiRangeSlider,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props {
  darkMode: boolean;
}

const StoryMultiRangeSliderGroup: Story<MultiRangeSliderProps> = (args) => {

  const returnTheCall = () => {
    return { valued: "One" };
  }


  return (
    <StoryLayout {...args}>
      <MultiRangeSlider
        min={1}
        max={120}
        variant={"Active"}
        title={""}
        operation={""}
        parentCallback={() => { returnTheCall() }} />
    </StoryLayout>
  );
};

export const Default = StoryMultiRangeSliderGroup.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["darkMode", "min", "max",] },
};
