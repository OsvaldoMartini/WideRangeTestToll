import React from "react";
import { Meta, Story } from "@storybook/react";
import {SliderAnimated} from "../src/";


import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Sliders/SliderAnimated",
  component: SliderAnimated,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props  {
  darkMode: boolean;
}

const StorySliderAnimatedGroup: Story<Props> = (args) => {
  // const [activeItem1, setActiveItem1] = React.useState<string>(
  //   options1[0].value,
  // );


  return (
    <StoryLayout {...args}>
      <div style={{margin: "0px 0px 0px 0px" }}>
        <SliderAnimated
        
          // active={activeItem1}
          // setActive={setActiveItem1}
          // options={options1}
        />
        {/* <CircleSelector variant={"Default unchecked"}/> */}
      </div>
    </StoryLayout>
  );
};

export const Default = StorySliderAnimatedGroup.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["active", "setActive", "options"] },
};
