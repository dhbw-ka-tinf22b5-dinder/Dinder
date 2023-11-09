import React from 'react';
import PropTypes from 'prop-types';
import './input-field.css';

export default function InputField({ id, type}) {
    return (
        <input
            id={id}
            type={type}
            className='input-field'
        >
        </input>
    );
};

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
};

InputField.defaultProps = {
    type: 'text',
};
