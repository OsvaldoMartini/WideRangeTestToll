import React from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "../StoryLayout";
import { HomePage, HomePageProps } from "./HomePage";

const meta: Meta = {
  title: "Web App/Pages/HomePage",
  component: HomePage,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryHomePage: Story<HomePageProps> = (args) => {

  return (
    <StoryLayout {...args}>
      <HomePage variant={args.variant} title={args.title} />
    </StoryLayout>
  );
};

export const Default = StoryHomePage.bind({});

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
