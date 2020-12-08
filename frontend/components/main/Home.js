import React from 'react';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from '@rmwc/button';
import { StyledTextButtonWhite } from '../styles/StyledText';

import Nav from './Nav';

const Home = () => (
  <ContainerHomepage>
    <Nav />
    <Link href="/guides">
      <StyledButton__Homepage raised>
        <StyledTextButtonWhite>
          Find the coolest MTB Guide!
        </StyledTextButtonWhite>
      </StyledButton__Homepage>
    </Link>
  </ContainerHomepage>
);

const ContainerHomepage = styled.div`
  display: grid;
  background: url('https://res.cloudinary.com/karolinauploads/image/upload/v1606308605/backgroundSommer3.jpg')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
`;
const StyledButton__Homepage = styled(Button)`
  && {
    align-self: center;
    justify-self: center;
    margin-bottom: 4rem;
    max-width: 300px;
    color: white;
    background-color: rgba(33, 33, 33, 0.7);
    text-transform: capitalize;
  }
`;
export default Home;
