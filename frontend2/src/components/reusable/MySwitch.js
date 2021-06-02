import React from 'react';
import PropTypes from 'prop-types';
import { TextGrayDense } from '../../styles/Text';
import { Switch } from '@rmwc/switch';
const MySwitch = ({ handleSwitch, name, text, checked }) => {
  return (
    <label htmlFor={name}>
      <TextGrayDense use="body1">{text}: </TextGrayDense>
      <Switch id={name} name={name} onChange={handleSwitch} checked={checked} />
    </label>
  );
};
MySwitch.propTypes = {
  handleSwitch: PropTypes.func,
  name: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
};
export default MySwitch;
