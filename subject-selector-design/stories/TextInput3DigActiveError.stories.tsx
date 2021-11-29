import React from "react";
import { Meta, Story } from "@storybook/react";
import { FiAlertCircle, FiHelpCircle, FiMail } from "react-icons/fi";
import {
  TextInput3DigActiveError,
  TextInput3DigActiveErrorProps,
} from "../src";
import StoryLayout from "./StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/TextInput/TextInput3DigActiveError",
  component: TextInput3DigActiveError,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

interface Props extends TextInput3DigActiveErrorProps {
  darkMode: boolean;
}

const StoryTextInput3DigActiveError: Story<Props> = (args) => {
  const [text1, setText1] = React.useState<string>(args.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText1(e.target.value);
  };

  return (
    <StoryLayout {...args}>
      <div>
        <TextInput3DigActiveError
          type="text"
          value={text1}
          handleChange={handleChange}
          placeholder="120"
          disabled={args.disabled}
          error={args.error}
        />
      </div>
    </StoryLayout>
  );
};

export const Default = StoryTextInput3DigActiveError.bind({});

Default.args = {
  disabled: false,
  error: false,
  value: "",
};

Default.parameters = {
  controls: {
    exclude: ["value", "type", "handleChange", "placeholder", "label"],
  },
};
