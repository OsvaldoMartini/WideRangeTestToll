import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { ButtonComp, ButtonProps } from "./ButtonComp";
import StoryLayout from "../StoryLayout";

const meta: Meta = {
  title: "BCSS-Design/Buttons/Buttons",
  component: ButtonComp,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const StoryButtons: Story<ButtonProps> = (args) => {
  // const title = !args.title && args.variant==="ButtonMainPage"? "Search": !args.title && args.variant==="SearchCriteria"? "NHS Number" : args.title;
  // args.title = title;

  return (
    <StoryLayout {...args}>
      <ButtonComp variant={args.variant} title={args.title} disabled={args.disabled} />
    </StoryLayout>
  );
};

export const ButtonMainPage = StoryButtons.bind({});

export const ButtonCriteria = StoryButtons.bind({});

export const ButtonCancelCriteria = StoryButtons.bind({});

export const ButtonCancelAge = StoryButtons.bind({});

export const ButtonOkayAge = StoryButtons.bind({});

export const ButtonSelectAgeCriteria = StoryButtons.bind({});

ButtonMainPage.args = {
  title: "Search",
  size: "md",
  darkMode: false,
  disabled: false,
  variant: "ButtonMainPage",
};

ButtonMainPage.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      // "darkMode",
      "disabled",
      "variant",
      "title",
    ],
  },
};

ButtonCriteria.args = {
  title: "NHS Number",
  addWidth: 130,
  size: "md",
  darkMode: false,
  disabled: false,
  variant: "SearchCriteria",
};

ButtonCriteria.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "darkMode",
      "disabled",
      "variant",
      "title",
    ],
  },
};

ButtonCancelCriteria.args = {
  title: "Cancel",
  size: "md",
  darkMode: false,
  disabled: false,
  variant: "ButtonCancelCriteria",
};

ButtonCancelCriteria.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "darkMode",
      "disabled",
      "variant",
      "title",
    ],
  },
};

ButtonCancelAge.args = {
  title: "Cancel",
  size: "md",
  darkMode: false,
  disabled: false,
  variant: "ButtonCancelAge",
};

ButtonCancelAge.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "darkMode",
      "disabled",
      "variant",
      "title",
    ],
  },
};

ButtonOkayAge.args = {
  title: "Okay",
  size: "md",
  darkMode: false,
  disabled: false,
  variant: "ButtonOkayAge",
};

ButtonOkayAge.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "darkMode",
      "variant",
      "title",
    ],
  },
};

ButtonSelectAgeCriteria.args = {
  title: "Select Age Criteria",
  size: "md",
  darkMode: false,
  disabled: false,
  variant: "ButtonSelectAgeCriteria",
};

ButtonSelectAgeCriteria.parameters = {
  controls: {
    exclude: [
      "LeadingIcon",
      "TrailingIcon",
      "IconOnly",
      "size",
      "className",
      "darkMode",
      "disabled",
      "variant",
      "title",
    ],
  },
};
