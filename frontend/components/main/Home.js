import React from 'react';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from '@rmwc/button';

import Nav from './Nav';

const Home = () => (
  <ContainerHomepage>
    <Nav />
    <Link href="/guides">
      <StyledButton__Homepage raised>
        Find the coolest MTB Guide!
      </StyledButton__Homepage>
    </Link>
  </ContainerHomepage>
);

const ContainerHomepage = styled.div`
  display: grid;
  background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1606308605/backgroundSommer3.jpg');
  height: 100vh;
`;
const StyledButton__Homepage = styled(Button)`
  && {
    align-self: center;
    justify-self: center;
    max-width: 300px;
    color: white;
    background-color: rgba(33, 33, 33, 0.7);
  }
`;
export default Home;
