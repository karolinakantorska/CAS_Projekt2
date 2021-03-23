import React from 'react';
import { TextGrayDense } from '../styles/Text';
import { Switch } from '@rmwc/switch';
const MySwitch = ({ handleSwitch, name, text, checked }) => {
  //email=name
  return (
    <label htmlFor={name}>
      <TextGrayDense use="body1">{text}: </TextGrayDense>
      <Switch id={name} name={name} onChange={handleSwitch} checked={checked} />
    </label>
  );
};
export default MySwitch;
