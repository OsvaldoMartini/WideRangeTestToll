import React from "react";
import { Meta, Story } from "@storybook/react";
import { FirstModal, ModalFirstProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Modals/FirstModalComponent",
  component: FirstModal,
  parameters: {
    controls: { expanded: true }
    }
};

export default meta;

const StoryFirstModal: Story<ModalFirstProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <FirstModal
      title = {args.title}
      modalVariant = {args.modalVariant}
      sectionVariant = {args.sectionVariant}
      />
    </StoryLayout>
  );
};

export const Default = StoryFirstModal.bind({});

Default.args = {
  title: "Demographic",
  modalVariant: "Display",
  sectionVariant: "Hide"
};

Default.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      //"title"
    ],
  },
};

export const HideModal = StoryFirstModal.bind({});

HideModal.args = {
  title: "Demographic",
  modalVariant: "Hide",
  sectionVariant: "Hide"
};

HideModal.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      //"title"
    ],
  },
};

export const SelectedAge = StoryFirstModal.bind({});

SelectedAge.args = {
  title: "Demographic",
  modalVariant: "Display",
  sectionVariant: "Display"
};

SelectedAge.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      //"title"
    ],
  },
};