import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
//import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SIGNIN_MUTATION from '../../graphgl/mutations/SIGNIN_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import Nav from '../main/Nav';
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';
import { validateForm, addErrorMessage, removeErrorMessage } from '../../lib/utilsForm';
import { useUser } from '../../lib/userState';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset, StyledButtons, StyledButton } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import {
  StyledTextTitle6,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';

const Signin = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { addCurrentUser } = useUser();
  const [signin, { loading, error, data }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      setEmail('');
      setPassword('');
      addCurrentUser(data.signin);
      router.push('/guides');
    },
    onError: (error) => {
      error;
    },
  });
  function handleSignin(e) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateForm(email, password);
    addErrorMessage(errors);
    if (errors.length === 0) {
      signin({
        variables: {
          email,
          password,
        },
      });
    }
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <React.Fragment>
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle6>Signin into account:</StyledTextTitle6>
              <ErrorMessage />
              {error && <Error error={error} />}
              <TextField
                data-test="input-email"
                required
                fullwidth
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                minLength={5}
                maxLength={100}
                helpText={{
                  persistent: true,
                  validationMsg: true,
                }}
                pattern="^\S+@\S+\.\S+$"
                required={true}
              />
              <TextField
                data-test="input-pasword"
                required
                fullwidth
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                minLength={8}
                maxLength={32}
                helpText={{
                  persistent: true,
                  validationMsg: true,
                }}
                pattern="^.{8,32}$"
                required={true}
              />
            </StyledFieldset>
            <StyledButtons>
              <StyledButton
                data-test="button-signin"
                onClick={(e) => handleSignin(e)}
                raised
                theme={['secondaryBg', 'onSecondary']}
              >
                <StyledTextButtonBlack>Signin!</StyledTextButtonBlack>
              </StyledButton>
              <Link href="/signup_page">
                <StyledButton>
                  <StyledTextButtonColor>Create new Account</StyledTextButtonColor>
                </StyledButton>
              </Link>
            </StyledButtons>
          </form>
        </StyledCard>
      </StyledContainer>
    </React.Fragment>
  );
};

export default Signin;
