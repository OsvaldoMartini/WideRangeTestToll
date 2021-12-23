import React, {useState} from "react";
import { Meta, Story } from "@storybook/react";

import StoryLayout from "./StoryLayout";
import { options1, OptionSelector, OptionSelectorProps } from "../src";
import { optionSelecData } from "../src/data";

const meta: Meta = {
  title: "BCSS-Design/Options/OptionSelector",
  component: OptionSelector,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryOptionSelector: Story<OptionSelectorProps> = (args) => {
  const [activeItem1, setActiveItem1] = useState<string>(
    options1[0].value,
  );

  const optSelecIndex = optionSelecData.findIndex(
    (optionSelec) => optionSelec.title === args.title,
  );
  const optionSelector = {
    ...optionSelecData[optSelecIndex],
  };

  return (
    <StoryLayout {...args}>
          <OptionSelector 
            title={args.title}
            variant={args.variant} 
            checked={args.checked} focus={false}
          />
    </StoryLayout>
  );
};

export const Default = StoryOptionSelector.bind({});

export const DefaultChecked = StoryOptionSelector.bind({});

export const FocusUnchecked = StoryOptionSelector.bind({});

export const FocusChecked = StoryOptionSelector.bind({});

Default.args = {
  title:optionSelecData[0].title,
  variant: "Default",
  children: "Between two given ages"
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
  title:optionSelecData[0].title,
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
  title:optionSelecData[0].title,
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
  title:optionSelecData[0].title,
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