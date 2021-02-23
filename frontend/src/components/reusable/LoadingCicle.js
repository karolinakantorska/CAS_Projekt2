import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';

const LoadingCicle = ({ size }) => {
  console.log(size);
  return <CircularProgress size={size} />;
};
export default LoadingCicle;
