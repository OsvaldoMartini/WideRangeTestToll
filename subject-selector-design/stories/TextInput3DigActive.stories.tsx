import React , {ChangeEvent, KeyboardEvent} from "react";
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
          error={args.error}
          id={args.id} onChange={function (event: ChangeEvent<HTMLInputElement>): void {
            args.value;
          } } onKeyDown={function (event: KeyboardEvent<HTMLInputElement>): void {
            args.value
          } }          />
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
