import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
//MWRC
import { CardPrimaryAction } from '@rmwc/card';
import { Card } from '@rmwc/card';
// Components
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import GuideAvatar from '../reusable/GuideAvatar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import { difficulties } from '../../lib/utils';
import LoadingCicle from '../reusable/LoadingCicle';
import MyDialog from '../reusable/MyDialog';

// Utils
import { useTrip } from '../../apollo/querries/useTrip';
import { useDeleteTrip } from '../../apollo/mutations/useDeleteTrip';
import {
  routeToTripDetails,
  routeToEditTrip,
  routeToCalendar,
} from '../../lib/utilsRouts';
import { permission } from '../../lib/utils';
// Components for Styling
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { StyledGuideCard } from '../styles/StyledCards';
import { StyledGuideImage } from '../styles/StyledImage';
import { H6, Subtitle, TextLink } from '../styles/Text';
// RMWC
import { Typography } from '@rmwc/typography';

const TripCard = ({ currentUserPermission, tripId }) => {
  const { loading, error, data } = useTrip(tripId);
  const [
    deleteTrip,
    { loading: loadingMutation, error: errorMutation },
  ] = useDeleteTrip();
  function handleDeleteTrip() {
    deleteTrip({ variables: { id: tripId } });
  }
  if (loading) {
    return (
      <StyledTripCard>
        <LoadingCicle size="large" />
      </StyledTripCard>
    );
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { trip } = data;
    return (
      <StyledTripCard>
        <H6 use="headline6">{trip.title}</H6>
        <Subtitle use="subtitle2">{trip.special}</Subtitle>
        <Typography use="body2">
          <strong>Guide: </strong>
          {trip.guide.name} {trip.guide.surname}
        </Typography>
        <Typography use="body2">
          <strong>Difficoulty Level: </strong>
          {difficulties[trip.difficulty]}
        </Typography>
        <Typography use="body2">
          <strong>Meeting Point: </strong>
          {trip.start}
        </Typography>
        <Typography use="body2">
          <strong>End Point: </strong>
          {trip.end}
        </Typography>
        <Typography use="body2">
          <strong>Do you need to book a whole day? </strong>
          {` ${trip.wholeDay ? 'YES' : 'NO'}`}
        </Typography>
        <CardPrimaryAction onClick={() => routeToTripDetails(tripId)}>
          <StyledGuideImage src={trip.photo} alt={`Photo of ${trip.title}`} />
        </CardPrimaryAction>
        {currentUserPermission !== '' && (
          <>
            <Link href={`/trip_details?tripId=${tripId}`}>
              <TextLink use="body2">Go to trip details!</TextLink>
            </Link>
            <ButtonMain
              text="Book This Trip!"
              onClick={() => routeToCalendar(trip.guide.id, trip.id)}
            />
          </>
        )}
        {currentUserPermission === permission.guide && (
          <>
            {errorMutation && <ErrorGraphql error={errorMutation} />}
            <StyledButtonSpan>
              <ButtonLink text="Edit" onClick={() => routeToEditTrip(tripId)} />
              <MyDialog
                title="Do you want to delete this Trip?"
                body="Are you sure?"
                handleAction={handleDeleteTrip}
              />
            </StyledButtonSpan>
          </>
        )}
      </StyledTripCard>
    );
  }
};
TripCard.propTypes = {
  tripId: PropTypes.string.isRequired,
  currentUserPermission: PropTypes.string,
};
export const StyledTripCard = styled(Card)`
  display: grid;
  padding: 8px;
  align-content: stretch;
  margin: auto;
  margin-top: 98px;
  max-width: 344px;
`;
export default TripCard;
