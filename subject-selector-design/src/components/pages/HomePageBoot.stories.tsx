import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "../StoryLayout";
import { HomePageBoot, HomePageBootProps } from "./HomePageBoot";

const meta: Meta = {
  title: "Web App/Pages/HomePageBoot",
  component: HomePageBoot,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryHomePageBoot: Story<HomePageBootProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <HomePageBoot variant={args.variant} title={args.title} />
    </StoryLayout>
  );
};

export const Default = StoryHomePageBoot.bind({});

Default.args = {
  variant: "HoverActive",
  title: "Search",
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: [] },
};

Default.parameters = {
  controls: {
    exclude: ["darkMode", "className", "disabled", "title", "variant"],
  },
};
