import React from 'react';
import Link from 'next/link';
import Nav from '../main/Nav';
import styled from 'styled-components';
import { Button } from '@rmwc/button';
import { StyledButtonTextWhite } from '../styles/Text';

const Home = () => (
  <div className="backgroungImage">
    <Nav />
    <ContainerHomepage>
      <Link href="/guides">
        <StyledButton__Homepage raised>
          <StyledButtonTextWhite>
            Find the coolest MTB Guide in Oberengardin!
          </StyledButtonTextWhite>
        </StyledButton__Homepage>
      </Link>
    </ContainerHomepage>
  </div>
);

const ContainerHomepage = styled.div`
  display: grid;
`;
const StyledButton__Homepage = styled(Button)`
  && {
    align-self: end;
    justify-self: center;
    //margin-bottom: -20%;
    margin-top: 60vh;
    padding: 5px;
    color: white;
    background-color: rgba(33, 33, 33, 0.7);
    text-transform: capitalize;
  }
`;
export default Home;
