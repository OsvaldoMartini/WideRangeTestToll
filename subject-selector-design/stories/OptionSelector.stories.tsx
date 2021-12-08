import React from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { options1, OptionSelector, OptionSelectorProps } from "../src";

const meta: Meta = {
  title: "BCSS-Design/Options/OptionSelector",
  component: OptionSelector,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryOptionSelector: Story<OptionSelectorProps> = (args) => {
  const [activeItem1, setActiveItem1] = React.useState<string>(
    options1[0].value,
  );


  return (
    <StoryLayout {...args}>
          <OptionSelector variant={args.variant} checked={args.checked} focus={false}/>
    </StoryLayout>
  );
};

export const Default = StoryOptionSelector.bind({});

export const DefaultChecked = StoryOptionSelector.bind({});

export const FocusUnchecked = StoryOptionSelector.bind({});

export const FocusChecked = StoryOptionSelector.bind({});

Default.args = {
  variant: "Default",
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
  zeplinLink:
    "zpl://components?stid=XXXXXXXXXXXXXXXXXXXXX",
};

DefaultChecked.args = {
  variant: "Default",
  checked:true,
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
  zeplinLink:
    "zpl://components?stid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

FocusUnchecked.args = {
  variant: "Focus",
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
  zeplinLink:
    "zpl://components?stid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};


FocusChecked.args = {
  variant: "Focus",
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
  zeplinLink:
    "zpl://components?stid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
};