import React from 'react';
// Components
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import InputPassword from '../reusable/InputPassword';
import Input from '../reusable/Input';
// Utils
import { useForm } from '../../lib/utilsForm';
import { routeToSignup } from '../../lib/utilsRouts';
import { useSignin } from '../../apollo/mutations/useSignin';
// Styling
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset } from '../styles/StyledForm';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { StyledTextTitle6 } from '../styles/StyledText';

const Signin = () => {
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
          <Input
            handleChange={handleChange}
            name="email"
            value={inputs.email.textValue || ''}
            error={errorInput.email}
          />
          <InputPassword
            value={inputs.password.textValue || ''}
            handleChange={handleChange}
            error={errorInput.pasword}
          />
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
