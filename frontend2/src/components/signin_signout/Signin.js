import React from 'react';
// Components
import Nav from '../main/Nav';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import InputPassword from '../reusable/InputPassword';
import Input from '../reusable/Input';
// Utils
import { useForm } from '../../lib/utilsForm';
import { routeToSignup } from '../../lib/utilsRouts';
import { useSignin } from '../../apollo/mutations/useSignin';
//import { useHydratationFix } from '../../lib/utils';
// Styling
import { StyledContainer } from '../../styles/StyledContainer';
import { StyledCard } from '../../styles/StyledCards';
import { StyledFieldset } from '../../styles/StyledForm';
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';
import { H6 } from '../../styles/Text';

const Signin = ({ redirectInfo }) => {
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
  /*
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  */
  return (
<StyledContainer>
    <StyledCard>
      <form onSubmit={handleSubmit} method="post">
        {loading && <LoadingBar />}
        <StyledFieldset disabled={loading} aria-busy={loading}>
          {redirectInfo && (
            <ErrorMessage error={redirectInfo}>{redirectInfo}</ErrorMessage>
          )}
          <H6 use="headline6">Signin into account:</H6>
          {error && <ErrorGraphql error={error} />}
          <Input
            handleChange={handleChange}
            name="email"
            value={inputs.email.textValue || ''}
            required={true}
            error={errorInput.email}
            autoComplete="username"
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
</StyledContainer>

  );
};
export default Signin;
