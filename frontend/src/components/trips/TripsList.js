import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
import GuideAvatar from '../reusable/GuideAvatar';
import TripCard from '../trips/TripCard';

import { trips } from '../../lib/trip';
// Utils

// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCardWithPadding } from '../styles/StyledForm';
import { StyledTextTitle5 } from '../styles/StyledText';
// TODO put this element to styles
import { StyledCardsContainer } from '../guide/GuidesList';

const AddInfo = ({ guideId }) => {
  console.log('guideId', guideId);
  return (
    <>
      <StyledContainer>
        <StyledSpan>
          <StyledTextTitle5>Trips added by:</StyledTextTitle5>
          <GuideAvatar guideId={guideId} />
        </StyledSpan>
        <StyledCardsContainer>
          {trips.map((trip) => (
            <TripCard id={trip.id}>trip</TripCard>
          ))}
        </StyledCardsContainer>
      </StyledContainer>
    </>
  );
};
const StyledSpan = styled.span`
  display: grid;
  justify-content: center;
  margin: auto;
`;

export default AddInfo;
