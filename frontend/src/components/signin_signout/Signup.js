import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { TextField } from '@rmwc/textfield';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import SIGNUP_MUTATION from '../../graphgl/mutations/SIGNUP_MUTATION';
import Nav from '../main/Nav';
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
import Loading from '../reusable/LoadingBar';
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';
// Utils
import {
  useFormInput,
  validateForm,
  addErrorMessage,
  removeErrorMessage,
} from '../../lib/utilsForm';
import { routeToGuidesList, routeToSignin } from '../../lib/utilsRouts';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset } from '../styles/StyledForm';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { StyledTextTitle6 } from '../styles/StyledText';

const Signup = () => {
  const password = useFormInput('');
  const email = useFormInput('');
  const name = useFormInput('');

  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
  });

  function handleSignup(e) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateForm(email.value, name.value, password.value);
    addErrorMessage(errors);
    if (errors.length === 0) {
      signup({
        variables: {
          email: email.value,
          password: password.value,
          name: name.value,
        },
      });
    }
  }
  //TODO LoadingBar
  //TODO Error
  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form>
            {loading && <Loading />}
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle6>Signup for a account:</StyledTextTitle6>
              <ErrorMessage />
              {error && <Error error={error} />}
              <TextField
                {...name}
                fullwidth
                placeholder="Name"
                value={name.value}
                required
                className="name_input"
              />
              <TextField
                {...email}
                fullwidth
                placeholder="Email"
                value={email.value}
                className="email_input"
              />
              <TextField
                {...password}
                fullwidth
                placeholder="Password"
                value={password.value}
                type="password"
                required
                className="password_input"
              />
            </StyledFieldset>
            <StyledButtonSpan>
              <ButtonMain
                text="Signup!"
                onClick={(e) => handleSignup(e)}
                loading={loading}
              />
              <ButtonLink
                text="Go to Signin!"
                onClick={routeToSignin}
                loading={loading}
              />
            </StyledButtonSpan>
          </form>
        </StyledCard>
      </StyledContainer>
    </React.Fragment>
  );
};

export default Signup;
