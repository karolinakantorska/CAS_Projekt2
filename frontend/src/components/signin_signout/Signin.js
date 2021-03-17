import React from 'react';
// Components
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import InputPassword from '../reusable/InputPassword';
import Input from '../reusable/Input';
// Utils
import { useForm } from '../../lib/utilsForm';
import { routeToSignup } from '../../lib/utilsRouts';
import { useSignin } from '../../apollo/mutations/useSignin';
// Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset } from '../styles/StyledForm';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { H6 } from '../styles/Text';

const Signin = () => {
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleSignin, {
    email: { textValue: '' },
    password: { textValue: '' },
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
      <form onSubmit={handleSubmit} method="post">
        {loading && <Loading />}
        <StyledFieldset disabled={loading} aria-busy={loading}>
          <H6 use="headline6">Signin into account:</H6>
          {error && <ErrorGraphql error={error} />}
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
          />
          <StyledButtonSpan>
            <ButtonMain text="Signin!" />
            <ButtonLink text="Create new Account" onClick={routeToSignup} />
          </StyledButtonSpan>
        </StyledFieldset>
      </form>
    </StyledCard>
  );
};
export default Signin;
