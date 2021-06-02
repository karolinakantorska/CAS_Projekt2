import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
//MWRC
import { CardPrimaryAction } from '@rmwc/card';
import { Card } from '@rmwc/card';
// Components
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
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
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';
import { StyledGuideImage } from '../../styles/StyledImage';
import { StyledTripCard } from '../../styles/StyledCards';
import { H6, Subtitle, TextLink, StyledTypographyRed } from '../../styles/Text';
// RMWC
import { Typography } from '@rmwc/typography';

const TripCard = ({ currentUser, tripId }) => {
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
        {trip.guide ? (
          <Typography use="body2">
            <strong>Guide: </strong>
            {trip.guide.name} {trip.guide.surname}
          </Typography>
        ) : (
          <StyledTypographyRed>
            No Guide is offerring this Trip at the moment.
          </StyledTypographyRed>
        )}

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
        {currentUser.permissions !== '' && (
          <>
            <Link href={`/trip/${tripId}`}>
              <TextLink use="body2">Go to trip details!</TextLink>
            </Link>
            {trip.guide && (
              <ButtonMain
                text={
                  currentUser.id === trip.guide.id
                    ? 'Booking Inactive'
                    : 'Book This Trip!'
                }
                onClick={() => routeToCalendar(trip.guide.id, trip.id)}
                disabled={currentUser.id === trip.guide.id ? true : false}
              />
            )}
          </>
        )}
        {trip.guide && currentUser.id === trip.guide.id && (
          <>
            {errorMutation && <ErrorGraphql error={errorMutation} />}
            <StyledButtonSpan>
              <ButtonLink
                text="Edit"
                onClick={() => routeToEditTrip(tripId, trip.guide.id)}
              />
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
  currentUser: PropTypes.object,
};

export default TripCard;
