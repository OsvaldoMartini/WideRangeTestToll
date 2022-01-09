import React from "react";
import { Meta, Story } from "@storybook/react";
import { ButtonSecondary, ButtonSecondaryProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Buttons/Button Secondary",
  component: ButtonSecondary,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryButtonSearch: Story<ButtonSecondaryProps> = (args) => (
  <StoryLayout {...args}>
    <ButtonSecondary {...args}>{args.title}</ButtonSecondary>
  </StoryLayout>
);

export const Default = StoryButtonSearch.bind({});

Default.args = {
  variant: "Enabled",
  title: "title",
  size: "md"
};

Default.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "variant",    
    ],
  },
};

export const Disabled = StoryButtonSearch.bind({});

Disabled.args = {
  variant: "Disabled",
  title: "title",
  size: "md"
};

Disabled.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "variant",    
    ],
  }
};