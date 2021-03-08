import React from 'react';
import { TextField } from '@rmwc/textfield';
import ErrorMessage from '../reusable/ErrorMessage';

const Input = ({ handleChange, name, value, error }) => {
  //email=name
  return (
    <>
      <TextField
        data-test="input-email"
        required
        fullwidth
        placeholder={name[0].toUpperCase() + name.substring(1)}
        name={name}
        value={value || ''}
        onChange={handleChange}
        required={true}
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};
export default Input;
