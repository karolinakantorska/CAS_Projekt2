import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
// Components
import SIGNIN_MUTATION from '../../graphgl/mutations/SIGNIN_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import Nav from '../main/Nav';
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
import Loading from '../reusable/LoadingBar';
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';
//Utils
import {
  useFormInput,
  validateSingin,
  addErrorMessage,
  removeErrorMessage,
} from '../../lib/utilsForm';
import { handleSignin } from '../../lib/utilsSign';
import { routeToGuidesList, routeToSignup } from '../../lib/utilsRouts';
import { useSignin } from '../../apollo/mutations/useSignin';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { StyledTextTitle6 } from '../styles/StyledText';

const Signin = () => {
  const password = useFormInput('');
  const email = useFormInput('');
  const [signin, { loading, error }] = useSignin();
  /*
  function handleSignin(e) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateSingin(email.value, password.value);
    addErrorMessage(errors);
    if (errors.length === 0) {
      signin({
        variables: {
          email: email.value,
          password: password.value,
        },
      });
    }
  }
*/
  return (
    <StyledContainer>
      <StyledCard>
        <form>
          {loading && <Loading />}
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <StyledTextTitle6>Signin into account:</StyledTextTitle6>
            <ErrorMessage />
            {error && <Error error={error} />}
            <TextField
              {...email}
              data-test="input-email"
              required
              fullwidth
              placeholder="Email"
              value={email.value}
              required={true}
            />
            <TextField
              {...password}
              data-test="input-pasword"
              required
              fullwidth
              placeholder="Password"
              type="password"
              value={password.value}
              required={true}
            />
          </StyledFieldset>
          <StyledButtonSpan>
            <ButtonMain
              loading={loading}
              text="Signin!"
              onClick={(e) => handleSignin(e, email.value, password.value, signin)}
            />
            <ButtonLink
              loading={loading}
              text="Create new Account"
              onClick={routeToSignup}
            />
          </StyledButtonSpan>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};
export default Signin;
