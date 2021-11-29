import React from "react";
import { Meta, Story } from "@storybook/react";
import { TextInput3DigActive, TextInput3DigActiveProps } from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/TextInput/TextInput3DigActive",
  component: TextInput3DigActive,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends TextInput3DigActiveProps {
  darkMode: boolean;
}

const StoryTextInput3DigActive: Story<Props> = (args) => {
  const [text1, setText1] = React.useState<string>(args.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText1(e.target.value);
  };

  return (
    <StoryLayout {...args}>
      <div>
        <TextInput3DigActive
          type="text"
          value={text1}
          handleChange={handleChange}
          placeholder="50"
          disabled={args.disabled}
          error={args.error}
        />
      </div>
    </StoryLayout>
  );
};

export const Default = StoryTextInput3DigActive.bind({});

Default.args = {
  disabled: false,
  error: false,
  value: "",
};

Default.parameters = {
  controls: {
    exclude: ["value", "type", "handleChange", "placeholder", "label", "error"],
  },
};
