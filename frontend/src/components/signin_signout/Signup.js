import React, { useState } from 'react';
import { TextField } from '@rmwc/textfield';
// Components
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
// Utils
import { useForm } from '../../lib/utilsForm';
import { routeToSignin } from '../../lib/utilsRouts';
import { useSignup } from '../../apollo/mutations/useSignup';
//import { handleSignup } from '../../lib/utilsSign';
// Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset } from '../styles/StyledForm';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { StyledTextTitle6 } from '../styles/StyledText';

const Signup = () => {
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleSignup, {});
  const [signup, { loading, error }] = useSignup();

  function handleSignup() {
    signup({
      variables: {
        email: inputs.email,
        password: inputs.password,
        name: inputs.name,
      },
    });
  }

  return (
    <StyledContainer>
      <StyledCard>
        <form>
          {loading && <Loading />}
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <StyledTextTitle6>Signup for a account:</StyledTextTitle6>
            {error && <ErrorGraphql error={error} />}
            <TextField
              fullwidth
              placeholder="Name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              required={true}
            />
            {errorInput.name && <ErrorMessage error={errorInput.name} />}
            <TextField
              fullwidth
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            {errorInput.email && <ErrorMessage error={errorInput.email} />}
            <TextField
              fullwidth
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required={true}
            />
            {errorInput.password && <ErrorMessage error={errorInput.password} />}
          </StyledFieldset>
          <StyledButtonSpan>
            <ButtonMain text="Signup!" onClick={handleSubmit} loading={loading} />
            <ButtonLink text="Go to Signin!" onClick={routeToSignin} loading={loading} />
          </StyledButtonSpan>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};

export default Signup;
