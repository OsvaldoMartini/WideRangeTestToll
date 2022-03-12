import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "../StoryLayout";
import { SubHeader, SubHeaderProps } from "./SubHeader";

const meta: Meta = {
  title: "BCSS-Design/Navigation/SubHeader",
  component: SubHeader,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends SubHeaderProps {
  darkMode: boolean;
}

const StorySubHeader: Story<Props> = (args) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args}>
      <SubHeader open={open} toggleOpen={handleToggle} />
    </StoryLayout>
  );
};

export const Default = StorySubHeader.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: ["darkMode", "open", "toggleOpen"] },
};
