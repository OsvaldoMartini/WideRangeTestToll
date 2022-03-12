import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "../StoryLayout";
import { OptionSelector, OptionSelectorProps } from "./OptionSelector";
import { optionSelecData } from "../../data";


const meta: Meta = {
  title: "BCSS-Design/Options/OptionSelector",
  component: OptionSelector,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryOptionSelector: Story<OptionSelectorProps> = (args) => {
  const optSelecIndex = optionSelecData.findIndex(
    (optionSelec) => optionSelec.title === args.title,
  );
  const optionSelector = {
    ...optionSelecData[optSelecIndex],
  };

  // const returnTheCall = () => {
  //   return { valued: "One" };
  // }

  return (
    <StoryLayout {...args}>
      <OptionSelector
        id={args.id}
        title={optionSelector.title}
        variant={args.variant}
        checked={args.checked}
        operation={args.operation}
      // parentCallback={() => returnTheCall()} 
      />
    </StoryLayout>
  );
};

export const Default = StoryOptionSelector.bind({});

export const DefaultChecked = StoryOptionSelector.bind({});

export const FocusUnchecked = StoryOptionSelector.bind({});

export const FocusChecked = StoryOptionSelector.bind({});

Default.args = {
  title: optionSelecData[0].title,
  variant: "Default",
  children: "Specific Age",
  operation: "===",
};

Default.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "className",
      "disabled",
      "addClassNames",
      "variant",
    ],
  },
};

DefaultChecked.args = {
  title: optionSelecData[0].title,
  variant: "Default",
  children: "Specific Age",
  operation: "===",
  checked: true,
};

DefaultChecked.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "className",
      "disabled",
      "addClassNames",
      "variant",
    ],
  },
};

FocusUnchecked.args = {
  title: optionSelecData[0].title,
  variant: "Focus",
  children: "Specific Age",
  operation: "===",
};

FocusUnchecked.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "className",
      "disabled",
      "addClassNames",
      "variant",
    ],
  },
};


FocusChecked.args = {
  title: optionSelecData[0].title,
  variant: "Focus",
  children: "Specific Age",
  operation: "===",
  checked: true,
};

FocusChecked.parameters = {
  controls: {
    expanded: ["true"],
    exclude: [
      "className",
      "disabled",
      "addClassNames",
      "variant",
    ],
  },
};