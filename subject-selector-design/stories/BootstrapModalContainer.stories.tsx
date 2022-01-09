import React from "react";
import { Meta, Story } from "@storybook/react";
import { BootstrapModalContainer, BootstrapModalContainerProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Modals/Bootstrap Modal Container",
  component: BootstrapModalContainer,
  parameters: {
    controls: { expanded: true }
    }
};

export default meta;

const StoryBootstrapModalContainer: Story<BootstrapModalContainerProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <BootstrapModalContainer
      title = {args.title}
      modalVariant = {args.modalVariant}
      />
    </StoryLayout>
  );
};

export const Default = StoryBootstrapModalContainer.bind({});

Default.args = {
  title: "Demographic",
  modalVariant: "Display"
};

Default.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      //"title"
    ],
  },
};

export const HideModal = StoryBootstrapModalContainer.bind({});

HideModal.args = {
  title: "Demographic",
  modalVariant: "Hide"
};

HideModal.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      //"title"
    ],
  },
};