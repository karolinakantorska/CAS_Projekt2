import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Card,
  CardActionButton,
  CardActionButtons,
} from '@rmwc/card';
import {
  StyledFieldset,
  StyledButtons,
  StyledButton,
} from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import SIGNUP_MUTATION from '../../graphgl/mutations/SIGNUP_MUTATION';
import Nav from '../main/Nav';
import { StyledContainer } from '../styles/StyledContainer';
// TODO better error handling

const Signup = (props) => {
  const [signup, { loading, error, data }] = useMutation(
    SIGNUP_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
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
    setName(e.target.value);
  }
  function handleSignup() {
    async (e) => {
      e.preventDefault();
      await signup({
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
    };
  }
  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <Card>
          <form method="post" onSubmit={() => handleSignup(e)}>
            <StyledFieldset disabled={loading}>
              <h4>Signup for a account:</h4>
              <TextField
                fullwidth
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
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
                onChange={handlePasswordChange}
              />
            </StyledFieldset>
            <StyledButtons>
              <StyledButton raised type="submit">
                Signup!
              </StyledButton>
              <Link href="/signin_page">
                <StyledButton outlined>Go to Signin!</StyledButton>
              </Link>
            </StyledButtons>
          </form>
        </Card>
      </StyledContainer>
    </React.Fragment>
  );
};

export default Signup;
