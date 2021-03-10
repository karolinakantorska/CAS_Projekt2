import React from 'react';

// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';

// Utils

// Components for Styling
import { StyledCardWithPadding } from '../styles/StyledForm';
import { StyledTextTitle5 } from '../styles/StyledText';

const AddInfo = () => {
  return (
    <StyledCardWithPadding>
      <StyledTextTitle5>Trips added by ...</StyledTextTitle5>
    </StyledCardWithPadding>
  );
};

export default AddInfo;
