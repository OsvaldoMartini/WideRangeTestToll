import React from "react";
import { Meta, Story } from "@storybook/react";
import { ButtonSVG, ButtonSVGProps } from "./ButtonSVG";
import StoryLayout from "../StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Buttons/Button SVG",
  component: ButtonSVG,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryButtonSVG: Story<ButtonSVGProps> = (args) => {
  return (
    <StoryLayout {...args}>
      <ButtonSVG {...args}>{args.title}</ButtonSVG>
    </StoryLayout>
  )
}

export const Default = StoryButtonSVG.bind({});

Default.args = {
  title: "title"
};

Default.parameters = {
  controls: {
    exclude: [
    ],
  },
};