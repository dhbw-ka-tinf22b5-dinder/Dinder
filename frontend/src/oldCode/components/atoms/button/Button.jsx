import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button({  label, onClick, className }) {
return (
  <button
    type="button"
    className={className}
    onClick={() => onClick()}
  >
    {label}
  </button>
);
};

Button.propTypes = {
primary: PropTypes.bool,
label: PropTypes.string.isRequired,
onClick: PropTypes.func,
className: PropTypes.string,
};

Button.defaultProps = {
primary: false,
onClick: undefined,
className: '',
};
