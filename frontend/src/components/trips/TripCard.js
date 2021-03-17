import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
//MWRC
import { CardPrimaryAction } from '@rmwc/card';
import { Card } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
import { trips } from '../../lib/trip';

// Utils
import { routeToTripDetails } from '../../lib/utilsRouts';
// Components for Styling
import { StyledCardWithPadding, StyledCard } from '../styles/StyledForm';
import {
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextBody2,
} from '../styles/StyledText';
// TODO cleanup this
import { StyledGuideCard } from '../guide/GuideCard';
import { StyledGuideImage } from '../styles/StyledImage';
// TODO do a button from read more
const AddInfo = ({ id }) => {
  const trip = trips[id];
  const tripId = id;
  return (
    <StyledTripCard>
      <StyledTextTitle6>{trip.title}</StyledTextTitle6>
      <StyledTextSubtitle1>{trip.special}</StyledTextSubtitle1>
      <StyledTextBody2>
        <strong>Difficoulty Level: </strong>
        {trip.difficoulty}
      </StyledTextBody2>
      <StyledTextBody2>
        <strong>Meeting Point: </strong> {trip.start}
      </StyledTextBody2>
      <StyledTextBody2>
        <strong>End Point: </strong> {trip.start}
      </StyledTextBody2>
      <CardPrimaryAction onClick={() => routeToTripDetails(tripId)}>
        <StyledGuideImage src={trip.photo} alt={`Photo of ${trip.title}`} />
      </CardPrimaryAction>
      <Link href={`/trip_details?tripId=${tripId}`}>
        <StyledSpan>
          <StyledTextSubtitle1>
            <strong>Read more...</strong>
          </StyledTextSubtitle1>
        </StyledSpan>
      </Link>
    </StyledTripCard>
  );
};
const StyledSpan = styled.span`
  cursor: pointer;
  p:hover {
    color: var(--colorLight);
  }
`;
export const StyledTripCard = styled(Card)`
  display: grid;
  padding: 8px;
  align-content: stretch;
  margin: auto;
  margin-top: 98px;
  max-width: 344px;
`;

export default AddInfo;
