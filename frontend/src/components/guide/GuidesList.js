import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
// Components
import User from '../main/User';
import GuideCard from './GuideCard';
import Error from '../reusable/Error';
import Loading from '../reusable/LoadingBar';
//utils
import { permission } from '../../lib/utils';
// Queries
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';

const GuidesList = () => {
  const { loading, error, data } = useQuery(ALL_GUIDES_QUERY, {
    variables: { permissions: permission.guide },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <StyledContainer>
        <Error error={error} />
        <p>Error: Can't download Guides, please try again later.</p>
      </StyledContainer>
    );
  }
  if (data) {
    return (
      <User>
        {(currentUserPermission) => (
          <span>
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
