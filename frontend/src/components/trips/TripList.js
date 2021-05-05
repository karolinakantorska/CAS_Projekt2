import React from 'react';
import PropTypes from 'prop-types';
// Components
import TripCard from './TripCard';
// Components for Styling
import { StyledCardsContainer } from '../styles/StyledContainer';

const TripList = ({ data, dataUser }) => {
  return (
    <StyledCardsContainer>
      {data.map((trip) => (
        <TripCard key={trip.id} tripId={trip.id} currentUser={dataUser.currentUser}>
          trip
        </TripCard>
      ))}
    </StyledCardsContainer>
  );
};
TripList.propTypes = {
  data: PropTypes.array,
  dataUser: PropTypes.object,
};
export default TripList;
