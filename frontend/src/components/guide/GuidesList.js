import React from 'react';
import styled from 'styled-components';
// Components
import GuideCard from './GuideCard';
import Error from '../reusable/Error';
import Loading from '../reusable/LoadingBar';
//utils
import { permission } from '../../lib/utils';
import { useAllUsersWithPermissionQuery } from '../../apollo/querries/useAllUsersWithPermissionQuery';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';

const GuidesList = () => {
  const { loading, error, data } = useAllUsersWithPermissionQuery(permission.guide);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loading || loadingCurrentUser) {
    return <Loading />;
  }
  if (error || errorCurrentUser) {
    return (
      <StyledContainer>
        {error && <Error error={error} />}
        {errorCurrentUser && <Error error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data && dataCurrentUser) {
    return (
      <StyledContainer>
        <StyledCard>
          {data.users.map((guide) => (
            <GuideCard
              data-test="guideCard"
              currentUserPermission={dataCurrentUser.currentUser.permissions}
              guide={guide}
              key={guide.id}
            />
          ))}
        </StyledCard>
      </StyledContainer>
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
