import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
// Components
import User from '../main/User';
import Nav from '../main/Nav';
import GuideCard from './GuideCard';
// Queries
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';

const GuidesList = (props) => {
  const { loading, error, data } = useQuery(ALL_GUIDES_QUERY, {
    variables: { permissions: 'GUIDE' },
  });
  if (error) return <p>Error:{error}</p>;
  if (loading) return <p>Loading...</p>;
  //if (!data.users) return <p>No MTB Guide found</p>;
  if (data) {
    console.log(data);
    return (
      <User>
        {(currentUserPermission) => (
          <span>
            <Nav />
            <StyledContainer>
              <StyledCard>
                {data.users.map((user) => (
                  <GuideCard
                    currentUserPermission={currentUserPermission}
                    user={user}
                    key={user.id}
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
