import React, { ChangeEvent, KeyboardEvent } from "react";
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

const StoryTextInput3DigActive: Story<TextInput3DigActiveProps> = (args) => {
  const [text1, setText1] = React.useState<any>(args.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText1(e.target.value);
  };

  return (
    <StoryLayout {...args}>
      <div>
        <TextInput3DigActive
          type="text"
          value={text1}
          placeholder="50"
          disabled={args.disabled}
          errorState={args.errorState}
          id={args.id}
          onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            args.value;
          }}
          onKeyDown={function (event: KeyboardEvent<HTMLInputElement>): void {
            args.value;
          }}
          variant={args.variant}
        />
      </div>
    </StoryLayout>
  );
};

export const Default = StoryTextInput3DigActive.bind({});
export const NHSNumber = StoryTextInput3DigActive.bind({});

Default.args = {
  disabled: false,
  error: false,
  value: "",
  variant: "Default",
};

Default.parameters = {
  controls: {
    exclude: ["value", "type", "handleChange", "placeholder", "label", "error"],
  },
};

NHSNumber.args = {
  disabled: false,
  error: false,
  value: "333.333",
  variant: "NHSNumber",
};

NHSNumber.parameters = {
  controls: {
    exclude: ["value", "type", "handleChange", "placeholder", "label", "error"],
  },
};
