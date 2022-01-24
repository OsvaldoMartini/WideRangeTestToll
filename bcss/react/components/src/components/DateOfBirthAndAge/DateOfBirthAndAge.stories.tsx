//import Alert from 'react-bootstrap'
import React from 'react';
import { DateOfBirthAndAge } from './DateOfBirthAndAge'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import '../../App.scss'

export default {
  title: 'Example/DateOfBirthAndAge',
  component: DateOfBirthAndAge,
} as ComponentMeta<typeof DateOfBirthAndAge>;

const Template: ComponentStory<typeof DateOfBirthAndAge> = (args) => <DateOfBirthAndAge {...args}></DateOfBirthAndAge>;

export const Default = Template.bind({});
Default.args = {
  dateOfBirth: '19 Jun 1998'
};
