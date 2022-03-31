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

const StoryMultiRangeSliderGroup: Story<MultiRangeSliderProps> = (args) => {

  // const returnTheCall = () => {
  //   return { valued: "One" };
  // }


  return (
    <StoryLayout {...args}>
      <MultiRangeSlider
        minLeft={0}
        maxLeft={119}
        minRight={1}
        maxRight={120}
        variant={"Active"}
        title={""}
        operation={""}
        category={""}
        valuesAge={undefined}
        changeValuesAge={function (value: any): void {
          throw new Error("Function not implemented.");
        }}      // parentCallback={() => { returnTheCall() }} 
      />
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
