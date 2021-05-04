import React from 'react';
import styled from 'styled-components';
// Components
import GuideCard from './GuideCard';
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import Nav from '../main/Nav';
//utils
import { permission } from '../../lib/utils';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
// Components for Styling
import { H6 } from '../styles/Text';
import {
  StyledContainer,
  StyledSpan,
  StyledCardsContainer,
} from '../styles/StyledContainer';

const GuidesList = () => {
  const { loading, error, data } = useAllUsersWithPermission(permission.guide);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loading || loadingCurrentUser) {
    return <LoadingBar />;
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
      <>
        <StyledContainer>
          <StyledSpan>
            <H6 use="headline6">Oberengardin MTB Guides</H6>
          </StyledSpan>
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
      </>
    );
  }
};

export default GuidesList;
