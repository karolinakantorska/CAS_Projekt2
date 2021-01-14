import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { TextField } from '@rmwc/textfield';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import SIGNUP_MUTATION from '../../graphgl/mutations/SIGNUP_MUTATION';
import Nav from '../main/Nav';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import { StyledFieldset, StyledButtons, StyledButton } from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextSubtitle2,
  StyledTextMenuWhite,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';
// TODO better error handling

const Signup = () => {
  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
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
    console.log('I am signing up on frontend');
    console.log(email, password, name);
    //async () => {
    //await
    signup({
      variables: {
        email,
        password,
        name,
      },
    });
    setEmail('');
    setPassword('');
    setName('');
    router.push('/guides');
  }

  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading}>
              <StyledTextTitle6>Signup for a account:</StyledTextTitle6>
              <TextField
                fullwidth
                placeholder="Name"
                value={name}
                onChange={(e) => handleNameChange(e)}
                minLength={2}
                maxLength={12}
                helpText={{
                  persistent: true,
                  validationMsg: true,
                }}
                pattern="[A-Za-z]{2,12}"
              />
              <TextField
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
              />
              <TextField
                fullwidth
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                minLength={8}
                maxLength={32}
                helpText={{
                  persistent: true,
                  validationMsg: true,
                }}
                pattern="^.{8,32}$"
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
