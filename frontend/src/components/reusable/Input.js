import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@rmwc/textfield';
import ErrorMessage from '../reusable/ErrorMessage';

const Input = ({ handleChange, name, value, required, error }) => {
  return (
    <>
      <TextField
        data-test="input-email"
        fullwidth
        placeholder={name[0].toUpperCase() + name.substring(1)}
        name={name}
        value={value || ''}
        onChange={handleChange}
        required={required}
        maxLength={40}
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};
Input.propTypes = {
  handleChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
};
export default Input;
