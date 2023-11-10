import React from 'react';
import Background from '../background/Background.jsx';

import Button from './Button.jsx';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
};

const Template = (args) => <Background><Button {...args} /></Background>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};
