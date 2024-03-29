import React, { useEffect } from 'react';
// Components
import GuideCard from './GuideCard';
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
//utils
import { noUser,permission } from '../../lib/utils';
import { useAllUsersWithPermission } from '../../apollo/querries/useAllUsersWithPermission';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useHydratationFix } from '../../lib/useHydratationFix';

// Components for Styling
import { H6 } from '../../styles/Text';
import {
  StyledContainer,
  StyledSpan,
  StyledCardsContainer,
} from '../../styles/StyledContainer';
 
const GuidesList = () => {
  const { loading, error, data } = useAllUsersWithPermission(permission.guide);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
    if (loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (errorCurrentUser) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser) {
      const currentUser = dataCurrentUser.currentUser
        ? dataCurrentUser.currentUser
        : noUser.currentUser;
  return (
    <StyledContainer>
      {loading && <LoadingBar />}
      {error && <ErrorGraphql error={error} />}
      {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      <StyledSpan>
        <H6 use="headline6">Oberengardin MTB Guides</H6>
      </StyledSpan>
      <StyledCardsContainer>
        {data &&
          dataCurrentUser &&
          data.users.map((guide) => (
            <GuideCard
              data-test="guideCard"
              currentUserPermission={currentUser.permissions}
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
