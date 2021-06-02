import React from 'react';
import Link from 'next/link';
import { ContainerHomepage, StyledButton__Homepage } from '../../styles/StyledHome';
import { StyledButtonTextWhite } from '../../styles/Text';

const Home = () => (
  <div className="backgroungImage">
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


export default Home;
