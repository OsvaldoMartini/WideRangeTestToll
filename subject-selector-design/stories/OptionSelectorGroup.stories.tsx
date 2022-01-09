import React from "react";
import { Meta, Story } from "@storybook/react";
import { OptionSelectorGroup, OptionSelectorGroupProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Options/OptionsSelectorGroup",
  component: OptionSelectorGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryOptionSelectorGroup: Story<OptionSelectorGroupProps> = (args) => {
  return (
    <StoryLayout {...args}>
      <OptionSelectorGroup
        variant={args.variant}
        checked={args.checked}
        focus={args.focus}
        showHeaderError={args.showHeaderError}
      />
    </StoryLayout>
  );
};

export const Default = StoryOptionSelectorGroup.bind({});

Default.args = {
  variant: "Default",
  darkMode: false,
  open: false,
  showHeaderError: false,
};

Default.parameters = {
  controls: { exclude: [] },
};

Default.parameters = {
  controls: {
    exclude: [
      "darkMode",
      "open",
      "className",
      "disabled",
      "variant",
      "focus",
      "checked",
    ],
  },
};
