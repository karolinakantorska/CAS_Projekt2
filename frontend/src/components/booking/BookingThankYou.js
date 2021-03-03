import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// RMWC
import { Button } from '@rmwc/button';
// Components
import Loading from '../reusable/LoadingBar';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ButtonLink from '../reusable/ButtonLink';
// Utils
import { useDayIdToQueryReservation } from '../../apollo/querries/useDayIdToQueryReservation';
import { timeToString } from '../../lib/utilsBooking';
import { routeToGuidesList, routeToCalendar } from '../../lib/utilsRouts';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
import { StyledTextBody1, StyledTextTitle6 } from '../styles/StyledText';

const BookingThankYou = (props) => {
  const { time, dayId, guideId } = props.props;
  const { loading, error, data } = useDayIdToQueryReservation(dayId, guideId, time);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    console.log(data.day);
    const { day } = data;
    const { nrOfPeople, description, time, userName, guide } = day.reservations[0];
    const writeTime = timeToString(time);
    return (
      <StyledContainer>
        <StyledCard>
          <StyledSpanPadding>
            <StyledTextTitle6>Congratulationss!</StyledTextTitle6>
            <StyledTextBody1>
              {`Your reservation for ${userName} has just been completed.`}
            </StyledTextBody1>
            <StyledTextBody1>
              {`Thank you for booking MTB Guide:
                      ${guide.name} ${guide.surname}.`}
            </StyledTextBody1>
            <StyledTextBody1>{`at ${day.day} ${day.month} ${day.year} for a ${writeTime}.`}</StyledTextBody1>
            <StyledTextBody1>
              {`You've reservated a trip for ${nrOfPeople} `}
              {nrOfPeople === '1' ? 'guest.' : 'guests.'}
            </StyledTextBody1>
            {description && (
              <StyledTextBody1>{`Description: ${description}`}</StyledTextBody1>
            )}
            <ButtonLink text="Book again!" onClick={() => routeToCalendar(guideId)} />
            <ButtonLink text="Book another guide!" onClick={routeToGuidesList} />
          </StyledSpanPadding>
        </StyledCard>
      </StyledContainer>
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
