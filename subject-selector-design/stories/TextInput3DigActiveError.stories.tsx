import React, {ChangeEvent, KeyboardEvent} from "react";
import { Meta, Story } from "@storybook/react";
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

const StoryTextInput3DigActiveError: Story<TextInput3DigActiveErrorProps> = (args) => {
  const [text1, setText1] = React.useState<any>(args.value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText1(e.target.value);
  };

  return (
    <StoryLayout {...args}>
      <div>
        <TextInput3DigActiveError
          type="text"
          value={text1}
          placeholder="120"
          disabled={args.disabled}
          errorState={args.errorState}
          id={args.id} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            args.value
          } } onKeyDown={function (event: KeyboardEvent<HTMLInputElement>): void {
            args.value;
          } }        />
      </div>
    </StoryLayout>
  );
};

export const Default = StoryTextInput3DigActiveError.bind({});

Default.args = {
  errorState: false,
  disabled: false,
  value: "",
};

Default.parameters = {
  controls: {
    exclude: ["value", "type", "handleChange", "placeholder", "label"],
  },
};
