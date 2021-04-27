import React from 'react';
// Components
import Nav from '../main/Nav';
import InputPassword from '../reusable/InputPassword';
import Input from '../reusable/Input';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useForm } from '../../lib/utilsForm';
import { routeToSignin } from '../../lib/utilsRouts';
import { useSignup } from '../../apollo/mutations/useSignup';
// Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset } from '../styles/StyledForm';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { H6 } from '../styles/Text';

const Signup = () => {
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleSignup, {
    name: { textValue: '' },
    email: { textValue: '' },
    password: { textValue: '' },
  });
  const [signup, { loading, error }] = useSignup();
  function handleSignup() {
    signup({
      variables: {
        email: inputs.email.textValue,
        password: inputs.password.textValue,
        name: inputs.name.textValue,
      },
    });
  }
  return (
    <>
      <Nav />
      <StyledCard>
        <form onSubmit={handleSubmit} method="post">
          {loading && <LoadingBar />}
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <H6 use="headline6">Signup for a account:</H6>
            {error && <ErrorGraphql error={error} />}
            <Input
              handleChange={handleChange}
              name="name"
              value={inputs.name.textValue || ''}
              required={true}
              error={errorInput.name}
            />
            <Input
              handleChange={handleChange}
              name="email"
              value={inputs.email.textValue || ''}
              required={true}
              error={errorInput.email}
            />
            <InputPassword
              value={inputs.password.textValue || ''}
              handleChange={handleChange}
              required={true}
              error={errorInput.password}
            />
            <StyledButtonSpan>
              <ButtonMain text="Signup!" value="Submit" />
              <ButtonLink text="Go to Signin!" onClick={routeToSignin} />
            </StyledButtonSpan>
          </StyledFieldset>
        </form>
      </StyledCard>
    </>
  );
};

export default Signup;
