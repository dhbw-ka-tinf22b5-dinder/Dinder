import React from 'react';
import Background from '../background/Background.jsx';

import InputField from './InputField.jsx';

export default {
    title: 'Components/Atoms/InputField',
    component: InputField,
};

const Template = (args) => <Background><InputField {...args} /></Background>;

export const InputFieldClassic = Template.bind({});
InputFieldClassic.args = {
    id: 'input1',
    text: 'some default text',
    onTextChange: (text) => {
        console.log(text);
    },
};
