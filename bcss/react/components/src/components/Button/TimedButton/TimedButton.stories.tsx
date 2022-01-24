//import Alert from 'react-bootstrap'
import React from "react";
import TimedButton from "./TimedButton"
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../../App.scss"

export default {
  title: 'Example/TimedButton',
  component: TimedButton,
} as ComponentMeta<typeof TimedButton>;

const Template: ComponentStory<typeof TimedButton> = (args) => <TimedButton {...args}>{args.text}</TimedButton>;

export const Default = Template.bind({});
Default.args = {
  variant: 'primary',
  text: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  text: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  text: 'success'
};
