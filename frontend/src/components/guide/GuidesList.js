import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
// Components
import User from '../main/User';
import Nav from '../main/Nav';
import GuideCard from './GuideCard';
import Error from '../main/Error';
// Queries
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';

const GuidesList = (props) => {
  const { loading, error, data } = useQuery(ALL_GUIDES_QUERY, {
    variables: { permissions: 'GUIDE' },
  });
  //console.log(data);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <div>
        <Error error={error} />
        <p>Error: Can't download Guides, please try again later.</p>
      </div>
    );
  }
  if (data) {
    return (
      <User>
        {(currentUserPermission) => (
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
