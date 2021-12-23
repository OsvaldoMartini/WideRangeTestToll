import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import { OptionSelectorGroup, OptionSelectorGroupProps } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Options/OptionsSelectorGroup",
  component: OptionSelectorGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryOptionSelectorGroup: Story<OptionSelectorGroupProps> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args}>
      <OptionSelectorGroup variant={args.variant} />
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
