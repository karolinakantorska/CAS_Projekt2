import React, { useState, useEffect } from 'react';
// Components
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
//Utils
import { useForm } from '../../lib/utilsForm';
import { routeToSignup } from '../../lib/utilsRouts';
import { useSignin } from '../../apollo/mutations/useSignin';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { StyledTextTitle6 } from '../styles/StyledText';

const Signin = () => {
  const [showPass, setShowPass] = useState('password');
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleSignin, {
    email: { textValue: '', required: true },
    password: { textValue: '', required: true },
  });
  const [signin, { loading, error }] = useSignin();
  function handleSignin() {
    signin({
      variables: {
        email: inputs.email.textValue,
        password: inputs.password.textValue,
      },
    });
  }
  return (
    <StyledCard>
      <form>
        {loading && <Loading />}
        <StyledFieldset disabled={loading} aria-busy={loading}>
          <StyledTextTitle6>Signin into account:</StyledTextTitle6>
          {error && <ErrorGraphql error={error} />}
          <TextField
            data-test="input-email"
            required
            fullwidth
            placeholder="Email"
            name="email"
            value={inputs.email.textValue || ''}
            onChange={handleChange}
            required={true}
          />
          {errorInput.email && <ErrorMessage error={errorInput.email} />}
          <TextField
            data-test="input-pasword"
            required
            fullwidth
            placeholder="Password"
            type={showPass}
            name="password"
            value={inputs.password.textValue || ''}
            onChange={handleChange}
            required={true}
            trailingIcon={{
              icon: 'visibility',
              size: 'xsmall',
              onMouseOver: () => setShowPass('text'),
              onMouseLeave: () => setShowPass('password'),
            }}
          />
          {errorInput.password && <ErrorMessage error={errorInput.password} />}
        </StyledFieldset>
        <StyledButtonSpan>
          <ButtonMain loading={loading} text="Signin!" onClick={handleSubmit} />
          <ButtonLink
            loading={loading}
            text="Create new Account"
            onClick={routeToSignup}
          />
        </StyledButtonSpan>
      </form>
    </StyledCard>
  );
};
export default Signin;
