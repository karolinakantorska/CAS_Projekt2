import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// RMWC
import { Button } from '@rmwc/button';
// Components
import LoadingBar from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import { ButtonLink } from '../reusable/Buttons';

// Utils
import { useDayIdToQueryReservation } from '../../apollo/querries/useDayIdToQueryReservation';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { routeToCalendar } from '../../lib/utilsRouts';
// Components for Styling
import { H6 } from '../../styles/Text';
import { StyledContainer } from '../../styles/StyledContainer';
import { StyledCardWithPadding } from '../../styles/StyledCards';
import BookingThankyouDetails from './BookingThankyouDetails';

const BookingThankYou = (props) => {
  const { time, dayId, guideId, tripId } = props.props;
  const { loading, error, data } = useDayIdToQueryReservation(dayId, guideId, time);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  if (loading || loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (error || errorCurrentUser) {
    return <ErrorGraphql error={error} />;
  }
  if (data && dataCurrentUser) {
    const { day } = data;
    const { guide } = day.reservations[0];
    const { currentUser } = dataCurrentUser;
    return (
      <>
        <StyledContainer>
          <StyledCardWithPadding>
            <H6 use="headline6">Congratulations!</H6>
            {currentUser.id === guideId && <p>Happy Holiday!</p>}
            {currentUser.id !== guideId && <BookingThankyouDetails data={data} />}
            <ButtonLink
              text={currentUser.id === guideId ? 'Book more Holiday!':`Book ${guide.name} again!`}
              onClick={() => routeToCalendar(guideId)}
            />
            {tripId && (
              <ButtonLink
                text={`Book ${data.day.reservations[0].trip.title} Trip again!`}
                onClick={() => routeToCalendar(guideId, tripId)}
              />
            )}
          </StyledCardWithPadding>
        </StyledContainer>
      </>
    );
  }
};
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;
BookingThankYou.propTypes = {
  time: PropTypes.string,
  guideId: PropTypes.string,
  dayId: PropTypes.string,
};
export default BookingThankYou;
