import React from "react";
import { Meta, Story } from "@storybook/react";
import { ModalFirstSelector, ModalFirstSelectorProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Modals/ModalFirstSelector",
  component: ModalFirstSelector,
  parameters: {
    controls: { expanded: true },
    },
};

export default meta;

const StoryModalFirstSelector: Story<ModalFirstSelectorProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <ModalFirstSelector
        title={args.title}
        variant={args.variant}
      />
    </StoryLayout>
  );
};

export const Default = StoryModalFirstSelector.bind({});


Default.args = {
  title: "Demographic",
  variant: "Active",
  opacity: 1,
};

Default.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "title",
      "disabled",
      "variant",
    ],
  },
};
