import React from "react";
import { Meta, Story } from "@storybook/react";
import {Draggable} from "../src";


import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Draggable/Draggable",
  component: Draggable,
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
      <div style={{margin: "0px 0px 0px 0px" }}>
        <Draggable        
          // active={activeItem1}
          // setActive={setActiveItem1}
          // options={options1}
        />
        {/* <CircleSelector variant={"Default unchecked"}/> */}
      </div>
    </StoryLayout>
  );
};

export const Default = StoryDraggableCompGroup.bind({});

Default.args = {
  darkMode: false,
};

Default.parameters = {
  controls: { exclude: ["active", "setActive", "options"] },
};
