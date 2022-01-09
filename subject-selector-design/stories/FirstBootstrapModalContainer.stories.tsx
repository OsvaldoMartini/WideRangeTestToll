import React from "react";
import { Meta, Story } from "@storybook/react";
import { FirstBootstrapModalContainer, FirstBootstrapModalContainerProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Modals/First Bootstrap Modal Container",
  component: FirstBootstrapModalContainer,
  parameters: {
    controls: { expanded: true }
    }
};

export default meta;

const StoryFirstBootstrapModalContainer: Story<FirstBootstrapModalContainerProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <FirstBootstrapModalContainer
        title={args.title}
        modalVariant={args.modalVariant} 
        sectionVariant={args.sectionVariant}      />
    </StoryLayout>
  );
};

export const Default = StoryFirstBootstrapModalContainer.bind({});

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

export const HideModal = StoryFirstBootstrapModalContainer.bind({});

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

export const SelectedAge = StoryFirstBootstrapModalContainer.bind({});

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