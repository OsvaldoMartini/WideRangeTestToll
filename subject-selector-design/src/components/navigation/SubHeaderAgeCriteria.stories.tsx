import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "../StoryLayout";
import { SubHeaderAgeCriteria, SubHeaderAgeCriteriaProps } from "./SubHeaderAgeCriteria";

const meta: Meta = {
  title: "BCSS-Design/Navigation/SubHeaderAgeCriteria",
  component: SubHeaderAgeCriteria,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends SubHeaderAgeCriteriaProps {
  darkMode: boolean;
}

const StorySubHeaderAgeCriteria: Story<Props> = (args) => {

  return (
    <StoryLayout {...args}>
      <SubHeaderAgeCriteria showErrorState={args.showErrorState} />
    </StoryLayout>
  );
};

export const Default = StorySubHeaderAgeCriteria.bind({});

Default.args = {
  darkMode: false,
  open: false,
  showErrorState: true,
};

Default.parameters = {
  controls: { exclude: ["darkMode", "open", "toggleOpen"] },
};
