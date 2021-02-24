import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// RMWC
import { Button } from '@rmwc/button';
// Components
import User from '../main/User';
import Nav from '../main/Nav';
import Loading from '../reusable/LoadingBar';
import ButtonLink from '../reusable/ButtonLink';
// Utils
import { timeToString } from '../../lib/utilsBooking';
import { routeToGuidesList, routeToCalendar } from '../../lib/utilsRouts';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
import { StyledTextBody1, StyledTextTitle6 } from '../styles/StyledText';
import DAY_WHERE_ID_QUERY from '../../graphgl/queries/DAY_WHERE_ID_QUERY';

const BookingThankYou = (props) => {
  const { time, dayId, guideId } = props.props;
  const { loading, error, data } = useQuery(DAY_WHERE_ID_QUERY, {
    variables: {
      id: dayId,
      guideId,
      time,
    },
    onError: (error) => {
      error;
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    console.log(data.day);
    const { month, year, day, reservations } = data.day;
    const { nrOfPeople, description, time, userName, guide } = reservations[0];
    const writeTime = timeToString(time);
    const { name, surname } = guide;
    return (
      <User>
        {(currentUserPermission, currentUserName) => (
          <span>
            <StyledContainer>
              <StyledCard>
                <StyledSpanPadding>
                  <StyledTextTitle6>Hallo {currentUserName}!</StyledTextTitle6>
                  <StyledTextBody1>
                    {`Your reservation for ${userName} has just been completed.`}
                  </StyledTextBody1>
                  <StyledTextBody1>
                    {`Thank you for booking MTB Guide:
                      ${name} ${surname}.`}
                  </StyledTextBody1>
                  <StyledTextBody1>{`at ${day} ${month} ${year} for a ${writeTime}.`}</StyledTextBody1>
                  <StyledTextBody1>
                    {`You've reservated a trip for ${nrOfPeople} `}
                    {nrOfPeople === '1' ? 'guest.' : 'guests.'}
                  </StyledTextBody1>
                  {description !== '' && (
                    <StyledTextBody1>{`Description: ${description}`}</StyledTextBody1>
                  )}
                  <ButtonLink
                    text="Book again!"
                    onClick={() => routeToCalendar(guideId)}
                  />
                  <ButtonLink text="Book another guide!" onClick={routeToGuidesList} />
                </StyledSpanPadding>
              </StyledCard>
            </StyledContainer>
          </span>
        )}
      </User>
    );
  }
};
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;
BookingThankYou.propTypes = {
  time: PropTypes.string,
  day: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};
export default BookingThankYou;
