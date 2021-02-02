import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { TextField } from '@rmwc/textfield';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import SIGNUP_MUTATION from '../../graphgl/mutations/SIGNUP_MUTATION';
import Nav from '../main/Nav';
import Error from '../main/Error';
import ErrorMessage from '../main/ErrorMessage';
import {
  addErrorMessage,
  regexCheckEmail,
  regexCheckPassword,
  messageWrongEmail,
  regexCheckName,
  messageWrongName,
  removeErrorMessage,
} from '../../lib/utils';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset, StyledButtons, StyledButton } from '../styles/StyledForm';
import {
  StyledTextTitle6,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';
// TODO better error handling

const Signup = () => {
  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setEmail('');
      setPassword('');
      setName('');
      router.push('/guides');
    },
    onError: (error) => {
      error;
    },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleNameChange(e) {
    console.log(e.target.validity.valid);
    setName(e.target.value);
  }

  function handleSignup(e) {
    e.preventDefault();
    removeErrorMessage();
    if (!regexCheckEmail.test(email)) {
      addErrorMessage(`${email} is not a valid email adresse.`);
    } else if (!regexCheckPassword.test(password)) {
      addErrorMessage(messageWrongEmail);
    } else if (!regexCheckName.test(name)) {
      addErrorMessage(messageWrongName);
    } else {
      signup({
        variables: {
          email,
          password,
          name,
        },
      });
    }
  }
  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle6>Signup for a account:</StyledTextTitle6>
              <ErrorMessage error={error} />
              {error && <Error error={error} />}
              <TextField
                fullwidth
                placeholder="Name"
                value={name}
                onChange={(e) => handleNameChange(e)}
                required
                className="input_name"
              />
              <TextField
                fullwidth
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                fullwidth
                placeholder="Password"
                value={password}
                type="password"
                onChange={handlePasswordChange}
                required
              />
            </StyledFieldset>
            <StyledButtons>
              <StyledButton
                raised
                onClick={(e) => handleSignup(e)}
                theme={['secondaryBg', 'onSecondary']}
              >
                <StyledTextButtonBlack>Signup!</StyledTextButtonBlack>
              </StyledButton>
              <Link href="/signin_page">
                <StyledButton>
                  <StyledTextButtonColor>Go to Signin!</StyledTextButtonColor>
                </StyledButton>
              </Link>
            </StyledButtons>
          </form>
        </StyledCard>
      </StyledContainer>
    </React.Fragment>
  );
};

export default Signup;
