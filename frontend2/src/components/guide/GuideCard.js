import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
//Components
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import LoadingCicle from '../reusable/LoadingCicle';
import ErrorGraphql from '../reusable/ErrorGraphql';
import MyDialog from '../reusable/MyDialog';
// Utils
import { useGuide } from '../../apollo/querries/useGuide';
import { useDeleteGuide } from '../../apollo/mutations/useDeleteGuide';
import {
  routeToGuideDetailsIfSignedIn,
  routeToCalendar,
  routeToEditGuide,
  routeToSignin,
  routeToTripList,
} from '../../lib/utilsRouts';
import { permission } from '../../lib/utils';
// Components for Styling
import { StyledGuideCard } from '../../styles/StyledCards';
import { StyledGuideImage } from '../../styles/StyledImage';
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';
import { H6, Subtitle, TextLink } from '../../styles/Text';
// RMWC
import { Typography } from '@rmwc/typography';
import { CardPrimaryAction } from '@rmwc/card';

const GuideCard = ({ currentUserPermission, guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  const [
    deleteUser,
    { loading: loadingMutation, error: errorMutation },
  ] = useDeleteGuide();
  function handleDeleteUser() {
    deleteUser({ variables: { id: guideId } });
  }

  if (loading) {
    return (
      <StyledGuideCard>
        <LoadingCicle size="large" />
      </StyledGuideCard>
    );
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { user } = data;
    const specialisations = user.specialisations.map((spec) =>
      ` ${spec}`.replace('_', ' '),
    );
    return (
      <StyledGuideCard>
        <CardPrimaryAction
          onClick={() => routeToGuideDetailsIfSignedIn(currentUserPermission, guideId)}
        >
          <StyledGuideImage src={user.photo} alt="Mountainbiker photo" />
        </CardPrimaryAction>
        {currentUserPermission && (
          <StyledSpanBookMe>
            <ButtonMain text="Book Me!" onClick={() => routeToCalendar(guideId)} />
          </StyledSpanBookMe>
        )}
        <StyledSpan>
          <H6 use="headline6">{`${user.name} ${user.surname}`}</H6>
          <Subtitle use="subtitle2">{user.title && `${user.title}`}</Subtitle>
          <Typography use="body2">
            <strong>Location: </strong>
            {user.location}
          </Typography>
          <Typography use="body2">
            <strong>Ebiking: </strong>
            {` ${user.ebike ? 'YES' : 'NO'}`}
          </Typography>
          <Typography use="body2">
            <strong>Specialisation:</strong>
            {specialisations.toString()}
          </Typography>
          {currentUserPermission !== '' && (
            <Link href={`/guide/${guideId}`}>
              <TextLink use="body2">Go to guide page!</TextLink>
            </Link>
          )}
          {currentUserPermission !== '' && (
            <ButtonMain text="See My Trips" onClick={() => routeToTripList(guideId)} />
          )}
        </StyledSpan>
        {!currentUserPermission && (
          <ButtonLink text="Logg in to book Me!" onClick={() => routeToSignin()} />
        )}
        {currentUserPermission === permission.admin && (
          <>
            {errorMutation && <ErrorGraphql error={errorMutation} />}
            <StyledButtonSpan>
              <ButtonLink text="Edit" onClick={() => routeToEditGuide(guideId)} />
              <MyDialog
                title="Do you want to delete this Guide?"
                body="Remember to check if there are any 'uncovered Reservations' after deleting this Guide."
                handleAction={handleDeleteUser}
              />
            </StyledButtonSpan>
          </>
        )}
      </StyledGuideCard>
    );
  }
};
GuideCard.propTypes = {
  currentUserPermission: PropTypes.string,
  guideId: PropTypes.string,
};
const StyledSpan = styled.span`
  display: grid;
  grid-template-rows: 1fr 25px 20px 20px 80px;
  padding: 8px;
`;
const StyledSpanBookMe = styled.span`
  min-width: 100px;
  max-width: 60%;
  margin-left: -8px;
  margin-top: -70px;
`;

export default GuideCard;
/*
 */
