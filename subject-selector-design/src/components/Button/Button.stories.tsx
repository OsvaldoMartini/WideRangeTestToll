//import Alert from 'react-bootstrap'
import React from 'react';
import Button from 'react-bootstrap/Button'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../App.scss'

export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>{args.text}</Button>;

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
