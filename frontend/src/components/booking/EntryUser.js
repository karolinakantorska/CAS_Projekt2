import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//Components
import GuideAvatar from '../reusable/GuideAvatar';
import { StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';

// Components for Styling
import { H6, TextSpecial } from '../styles/Text';
import {
  EntrySpan,
  StyledSpan,
  StyledTypography,
  StyledButton,
} from '../styles/StyledEntry';

// RMWC
import { Typography } from '@rmwc/typography';

import { Dialog, DialogTitle, DialogContent } from '@rmwc/dialog';
const EntryUser = ({ reservation, currentUser }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <EntrySpan
        className={reservation.time}
        onClick={() => currentUser.id === reservation.gastId && setOpen(true)}
      >
        {currentUser.id === reservation.gastId ? (
          <TextSpecial use="caption">
            Your booking!
            <IconConfirmed confirmed={reservation.confirmed} size="xsmall" />
          </TextSpecial>
        ) : (
          <Typography use="caption">Booked!</Typography>
        )}
      </EntrySpan>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        value="hallo"
      >
        <StyledSpan>
          <H6 use="headline6">{`Reservation for ${reservation.relatedDay.day} ${reservation.relatedDay.month} 
            ${reservation.relatedDay.year}`}</H6>
          <StyledSpanAvatar>
            <GuideAvatar guideId={reservation.guide.id} />
          </StyledSpanAvatar>

          <Typography use="body2">
            Email: <strong>{reservation.guide.email}</strong>.
          </Typography>
          <Typography use="body2">
            Phone: <strong>{reservation.guide.phone}</strong>.
          </Typography>
          <Typography use="body2">
            Tour type: <strong>{reservation.time}</strong> tour
          </Typography>
          <Typography use="body2">
            You've reservated a trip for
            <strong>{` ${reservation.nrOfPeople} `}</strong>
            {reservation.nrOfPeople === '1' ? 'guest.' : 'guests.'}
          </Typography>
          {reservation.description && (
            <Typography use="body2">Description: {reservation.description}</Typography>
          )}
          <StyledTypography use="body2">
            <IconConfirmed confirmed={reservation.confirmed} size="large" />
          </StyledTypography>

          <StyledButton action="close">
            <StyledTextMain>Close</StyledTextMain>
          </StyledButton>
        </StyledSpan>
      </Dialog>
    </>
  );
};

EntryUser.propTypes = {
  reservation: PropTypes.object,
};
const StyledSpanAvatar = styled.div`
  margin: 50px auto 20px auto;
`;
export default EntryUser;
