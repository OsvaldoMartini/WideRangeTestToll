import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import OnMouseEnvents from "../src/components/options/OnMouseEvents";

const meta: Meta = {
  title: "BCSS-Design/MouseEvents/OnMouseEvents",
  component: OnMouseEnvents,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryOptionSelectorGroup: Story<{}> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  
  return (
    <StoryLayout {...args}>
      <OnMouseEnvents />
    </StoryLayout>
  );
};

export const Default = StoryOptionSelectorGroup.bind({});

Default.args = {
  variant: "Default",
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: [] },
};

Default.parameters = {
  controls: { exclude: ["darkMode", "open", "className", "disabled"] },
};
