import React from "react";
import { Meta, Story } from "@storybook/react";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { ButtonSearch, ButtonSearchProps,  Typography } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Buttons/Button Search",
  component: ButtonSearch,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends ButtonSearchProps {
  darkMode: boolean;
}

const StoryButtonSearch: Story<Props> = (args) => (
  <StoryLayout {...args} className="space-y-2">
    <ButtonSearch {...args}>Search</ButtonSearch>
  </StoryLayout>
);

export const Default = StoryButtonSearch.bind({});

Default.args = {
  variant: "primary",
  size: "md",
  darkMode: false,
  disabled: false,
};

Default.parameters = {
  controls: { exclude: ["LeadingIcon", "TrailingIcon", "IconOnly"] },
};
