import React, {HTMLAttributes} from "react";
import { Meta, Story } from "@storybook/react";
import StoryLayout from "./StoryLayout";
import { HomePage, } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Navigation/HomePage",
  component: HomePage,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;


interface Props {
  darkMode: boolean;
}

const StoryHomePage: Story<Props> = (args) => {
 
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <StoryLayout {...args} noPadding>
      <HomePage/>
    </StoryLayout>
  );
};

export const Default = StoryHomePage.bind({});

Default.args = {
  darkMode: false,
  open: false,
};

Default.parameters = {
  controls: { exclude: [] },
};
