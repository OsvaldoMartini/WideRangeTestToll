import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import { ModalContainer, ModalContainerProps } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Modals/ModalContainer",
  component: ModalContainer,
  parameters: {
    controls: { expanded: true },
    },
};

export default meta;

const StoryModalContainer: Story<ModalContainerProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <ModalContainer
        title={args.title}
        variant={args.variant} 
        show={true} 
        disabled={false}
        children={<div style={{height:"9rem"}}>This is a Body Sample</div>}
        />
    </StoryLayout>
  );
};

export const Default = StoryModalContainer.bind({});


Default.args = {
  title: "Demographic",
  variant: "Default",
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
