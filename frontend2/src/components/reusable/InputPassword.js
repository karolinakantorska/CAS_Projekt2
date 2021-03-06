import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@rmwc/textfield';
import ErrorMessage from '../reusable/ErrorMessage';

const InputPassword = ({ handleChange, value, error }) => {
  const [showPass, setShowPass] = useState('password');
  return (
    <>
      <TextField
        data-test="input-pass"
        fullwidth
        placeholder="Password"
        type={showPass}
        name="password"
        value={value || ''}
        onChange={handleChange}
        required={true}
        trailingIcon={{
          icon: 'visibility',
          size: 'xsmall',
          onMouseOver: () => setShowPass('text'),
          onClick: () => setShowPass('text'),
          onMouseLeave: () => setShowPass('password'),
        }}
        autoComplete="current-password"
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};
InputPassword.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
};
export default InputPassword;
