import React from 'react';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from '@rmwc/button';
import { StyledTextButtonWhite } from '../styles/StyledText';

const Home = () => (
  <ContainerHomepage>
    <Link href="/guides">
      <StyledButton__Homepage raised>
        <StyledTextButtonWhite>Find the coolest MTB Guide!</StyledTextButtonWhite>
      </StyledButton__Homepage>
    </Link>
  </ContainerHomepage>
);

const ContainerHomepage = styled.div`
  display: grid;
  background: url('https://res.cloudinary.com/karolinauploads/image/upload/v1607789948/background1440x810.jpg')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  @media (max-width: 1280px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1608111607/backgroundBikerBW1280x720.png');
  }
  @media (max-width: 1439px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1608111608/background1440x810.png');
  }
  @media (min-width: 1440px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1608111608/backgroundBikerBW1600x900.png');
  }
`;
const StyledButton__Homepage = styled(Button)`
  && {
    align-self: center;
    justify-self: center;
    margin-bottom: 4rem;
    padding: 5px;
    color: white;
    background-color: rgba(33, 33, 33, 0.7);
    text-transform: capitalize;
  }
`;
export default Home;
