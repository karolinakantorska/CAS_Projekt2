import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SIGNIN_MUTATION from '../../graphgl/mutations/SIGNIN_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import Nav from '../main/Nav';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard } from '../styles/StyledForm';
import {
  StyledFieldset,
  StyledButtons,
  StyledButton,
} from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
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
import { Button } from '@rmwc/button';
import styled from 'styled-components';

const Signin = (props) => {
  const [signin, { loading, error, data }] = useMutation(
    SIGNIN_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  function handleSignin() {
    console.log('hallo');
    console.log(email, password);
    signin({
      variables: {
        email,
        password,
      },
    });
    setEmail('');
    setPassword('');
    router.push('/guides');
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading}>
              <StyledTextTitle6>
                Signin into account:
              </StyledTextTitle6>

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
              <StyledButton
                onClick={handleSignin}
                raised
                theme={['secondaryBg', 'onSecondary']}
              >
                <StyledTextButtonBlack>Signin!</StyledTextButtonBlack>
              </StyledButton>
              <Link href="/signup_page">
                <StyledButton onClick={handleSignin}>
                  <StyledTextButtonColor>
                    Create new Account
                  </StyledTextButtonColor>
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
