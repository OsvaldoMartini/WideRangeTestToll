import React from "react";
import { Meta, Story } from "@storybook/react";



import StoryLayout from "./StoryLayout";
import CircleProgress from "../src/components/slider/CircleProgress";

const meta: Meta = {
  title: "BCSS-Design/Sliders/CircleProgress",
  component: CircleProgress,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props  {
  darkMode: boolean;
}

const StoryCircleProgressGroup: Story<Props> = (args) => {
  // const [activeItem1, setActiveItem1] = React.useState<string>(
  //   options1[0].value,
  // );


  return (
    <StoryLayout {...args}>
      <div style={{margin: "0px 0px 0px 0px" }}>
        <CircleProgress       
          // active={activeItem1}
          // setActive={setActiveItem1}
          // options={options1}
        />
        {/* <CircleSelector variant={"Default unchecked"}/> */}
      </div>
    </StoryLayout>
  );
};

export const Default = StoryCircleProgressGroup.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["active", "setActive", "options"] },
};
