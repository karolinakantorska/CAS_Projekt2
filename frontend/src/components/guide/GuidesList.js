import React from 'react';
import styled from 'styled-components';
// Components
import GuideCard from './GuideCard';
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
//utils
import { permission } from '../../lib/utils';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
// Components for Styling
import { StyledContainer, StyledCardsContainer } from '../styles/StyledContainer';

const GuidesList = () => {
  const { loading, error, data } = useAllUsersWithPermission(permission.guide);
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
        {error && <ErrorGraphql error={error} />}
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (data && dataCurrentUser) {
    return (
      <StyledContainer>
        <StyledCardsContainer>
          {data.users.map((guide) => (
            <GuideCard
              data-test="guideCard"
              currentUserPermission={dataCurrentUser.currentUser.permissions}
              guide={guide}
              guideId={guide.id}
              key={guide.id}
            />
          ))}
        </StyledCardsContainer>
      </StyledContainer>
    );
  }
};

export default GuidesList;
