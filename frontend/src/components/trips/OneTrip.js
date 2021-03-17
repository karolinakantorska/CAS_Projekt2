import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';

import { trips } from '../../lib/trip';
// Utils

// Components for Styling
import { StyledCardWithPadding } from '../styles/StyledForm';
import {
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextBody1,
  StyledTextBody2,
} from '../styles/StyledText';
import { StyledImage } from '../styles/StyledImage';

const OneTrip = ({ id }) => {
  const trip = trips[id];
  console.log(trip);
  return (
    <StyledCardWithPadding>
      <StyledSpan>
        <StyledTextTitle6>{trip.title}</StyledTextTitle6>
        <StyledTextSubtitle1>{trip.special}</StyledTextSubtitle1>
        <StyledImage src={trip.photo} alt={`Photo of ${trip.title}`} />
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
        <StyledTextBody2>
          <strong>How long this will take: </strong> {trip.duration}
        </StyledTextBody2>
        <StyledTextBody2>
          <strong>Aditional costs: </strong> {trip.costs}
        </StyledTextBody2>
        <StyledTextBody2>
          <strong>Are the ebikes Alowed?: </strong> {trip.ebikes ? 'YES' : 'NO'}
        </StyledTextBody2>
        <StyledTextBody1>{trip.description}</StyledTextBody1>
      </StyledSpan>
      <ButtonMain text="Book Me Now!" onClick={() => null} />
    </StyledCardWithPadding>
  );
};
const StyledSpan = styled.span`
  display: grid;
`;
export default OneTrip;
