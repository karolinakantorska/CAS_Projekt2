import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
//Components
import GuideAvatar from '../reusable/GuideAvatar';
import { StyledTextMain } from '../reusable/Buttons';
import IconConfirmed from '../reusable/IconConfirmed';
import { ButtonLink } from '../reusable/Buttons';
//Utils
import { routeToTripDetails } from '../../lib/utilsRouts';
// Components for Styling
import {
  H6,
  TextSpecial,
  StyledTypographyRed,
  StyledTypographyGreen,
} from '../styles/Text';
import {
  EntrySpan,
  EntrySpanNoClick,
  StyledSpan,
  StyledButton,
} from '../styles/StyledEntry';
// RMWC
import { Typography } from '@rmwc/typography';
import { Dialog, DialogTitle, DialogContent } from '@rmwc/dialog';

const EntryUser = ({ reservation, currentUser }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {currentUser.id === reservation.gastId ? (
        <EntrySpan
          className={`${reservation.time}`}
          onClick={() => currentUser.id === reservation.gastId && setOpen(true)}
        >
          <TextSpecial use="caption">
            Your booking!
            <IconConfirmed confirmed={reservation.confirmed} size="xsmall" />
          </TextSpecial>
        </EntrySpan>
      ) : (
        <EntrySpanNoClick
          className={reservation.time}
          onClick={() => currentUser.id === reservation.gastId && setOpen(true)}
        >
          <Typography use="caption">Booked!</Typography>
        </EntrySpanNoClick>
      )}

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
          {reservation.trip && (
            <>
              <Typography use="body2">
                You've booked
                <strong>{` ${reservation.trip.title} trip.`}</strong> with a start point
                in <strong>{` ${reservation.trip.start}.`}</strong>
              </Typography>
              <ButtonLink
                text="Go to Trip description!"
                onClick={() => routeToTripDetails(reservation.trip.id)}
              />
            </>
          )}
          <Typography use="body2">
            You've reservated a trip for
            <strong>{` ${reservation.nrOfPeople} `}</strong>
            {reservation.nrOfPeople === '1' ? 'guest.' : 'guests.'}
          </Typography>
          {reservation.description && (
            <Typography use="body2">
              Your message to the Guide: {reservation.description}
            </Typography>
          )}
          <StyledTypographyRed use="body2"></StyledTypographyRed>
          {reservation.confirmed ? (
            <>
              <StyledTypographyGreen use="body2">
                <IconConfirmed confirmed={reservation.confirmed} size="large" />
              </StyledTypographyGreen>
              <StyledTypographyGreen use="body2">
                Reservation confirmed by Guide.
              </StyledTypographyGreen>
            </>
          ) : (
            <>
              <StyledTypographyRed use="body2">
                <IconConfirmed confirmed={reservation.confirmed} size="large" />
              </StyledTypographyRed>
              <StyledTypographyRed use="body2">
                Reservation haven't been confirmed yet.
              </StyledTypographyRed>
            </>
          )}
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
