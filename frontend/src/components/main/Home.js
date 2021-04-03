import React from 'react';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from '@rmwc/button';
import { StyledButtonTextWhite } from '../styles/Text';

const Home = () => (
  <ContainerHomepage>
    <Link href="/guides">
      <StyledButton__Homepage raised>
        <StyledButtonTextWhite>Find the coolest MTB Guide!</StyledButtonTextWhite>
      </StyledButton__Homepage>
    </Link>
  </ContainerHomepage>
);

const ContainerHomepage = styled.div`
  display: grid;
  background: url('https://res.cloudinary.com/karolinauploads/image/upload/v1617466223/background21600x900.jpg')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  @media (max-width: 1280px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1617466235/background21000x550.jpg');
  }
  @media (max-width: 1439px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1617466229/background21200x675.jpg');
  }
`;
const StyledButton__Homepage = styled(Button)`
  && {
    align-self: center;
    justify-self: center;
    margin-bottom: -20%;
    padding: 5px;
    color: white;
    background-color: rgba(33, 33, 33, 0.7);
    text-transform: capitalize;
  }
`;
export default Home;
