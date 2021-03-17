import React from 'react';

// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import { ButtonMain } from '../reusable/Buttons';

// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useForm } from '../../lib/utilsForm';
import { permission } from '../../lib/utils';

// Components for Styling
import { StyledCardWithPadding } from '../styles/StyledCards';
import { StyledCard, StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { H6 } from '../styles/Text';

const ChangeInfo = () => {
  const inputs = { description: { textValue: 'Hallo Info' } };
  const handleSubmit = () => null;
  const handleChange = () => null;
  return (
    <StyledCardWithPadding>
      <form onSubmit={handleSubmit} method="post">
        <StyledFieldset disabled={false} aria-busy={false}>
          <H6 use="headline6">Add new Info Text</H6>
          <TextField
            fullwidth
            onChange={handleChange}
            name="description"
            placeholder={inputs.description.textValue || ''}
            value={inputs.description.textValue || 'Here You can write...'}
            required={false}
            textarea={true}
            rows={12}
            maxLength={3000}
          />
          <ButtonMain text="Change Text" />
        </StyledFieldset>
      </form>
    </StyledCardWithPadding>
  );
};

export default ChangeInfo;
