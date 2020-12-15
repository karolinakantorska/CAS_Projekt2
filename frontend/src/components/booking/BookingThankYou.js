import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// RMWC
import { Button } from '@rmwc/button';
// Components
import User from '../main/User';
import Nav from '../main/Nav';
// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
import {
  StyledTextBody1,
  StyledTextTitle6,
  StyledTextButtonColor,
} from '../styles/StyledText';

const BookingThankYou = (props) => {
  const { time, day, month, year, guideId, guideName, guideSurname } = props.props;

  return (
    <User>
      {(currentUserPermission, currentUserName) => (
        <span>
          <Nav />
          <StyledContainer>
            <StyledCard>
              <StyledSpanPadding>
                <StyledTextTitle6>Hallo {currentUserName}!</StyledTextTitle6>
                <StyledTextBody1>
                  Thankyou for booking MTB Guide:{' '}
                  <strong>
                    {guideName} {guideSurname}
                  </strong>{' '}
                  for a <strong>{time}</strong> trip on: {day} {month} {year}
                </StyledTextBody1>
                <Link href="/guides">
                  <StyledButtonLink>
                    <StyledTextButtonColor>Book one more trip!</StyledTextButtonColor>
                  </StyledButtonLink>
                </Link>
              </StyledSpanPadding>
            </StyledCard>
          </StyledContainer>
        </span>
      )}
    </User>
  );
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
