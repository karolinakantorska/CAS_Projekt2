import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
// Components
import User from '../main/User';
import Nav from '../main/Nav';
import GuideCard from './GuideCard';
import Error from '../main/Error';
import { useUser } from '../../lib/userState';
// Queries
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';

const GuidesList = (props) => {
  const { currentUser } = useUser();
  console.log(currentUser);

  const { loading, error, data } = useQuery(ALL_GUIDES_QUERY, {
    variables: { permissions: 'GUIDE' },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <React.Fragment>
        <Error error={error} />
        <p>Error: Can't download Guides, please try again later.</p>
      </React.Fragment>
    );
  }
  if (data) {
    return (
      <User>
        {(currentUserPermission, currentUserName) => (
          <span>
            <Nav />
            <StyledContainer>
              <StyledCard>
                {data.users.map((guide) => (
                  <GuideCard
                    data-test="guideCard"
                    currentUserPermission={currentUserPermission}
                    guide={guide}
                    key={guide.id}
                    currentUserName={currentUserName}
                  />
                ))}
              </StyledCard>
            </StyledContainer>
          </span>
        )}
      </User>
    );
  }
};
const StyledCard = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1% 2%;
  row-gap: 15px;
  justify-content: space-between;
`;

export default GuidesList;
