import React from 'react';
import PropTypes from 'prop-types';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import Loading from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
// Utils
import { useTrip } from '../../apollo/querries/useTrip';
import { difficulties } from '../../lib/utils';
import { routeToCalendar, routeToTripList } from '../../lib/utilsRouts';
// Components for Styling
import { StyledCardWithPadding, StyledOneGuideGrid } from '../styles/StyledCards';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { H6, Subtitle } from '../styles/Text';
import { StyledImage } from '../styles/StyledImage';
// RMWC
import { Typography } from '@rmwc/typography';

const OneTrip = ({ tripId }) => {
  const { loading, error, data } = useTrip(tripId);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { trip } = data;
    return (
      <StyledCardWithPadding>
        <StyledOneGuideGrid>
          <H6 use="headline6" className="title">
            {trip.title}
          </H6>
          <Subtitle use="subtitle2" className="subtitle">
            {trip.special}
          </Subtitle>
          <span className="info1">
            <Typography use="body2" className="info1">
              <strong>Difficoulty Level: </strong>
              {difficulties[trip.difficulty]}
            </Typography>
            <br />
            <Typography use="body2" className="info2">
              <strong>Meeting Point: </strong>
              {trip.start}
            </Typography>
            <br />
            <Typography use="body2" className="info3">
              <strong>End Point: </strong>
              {trip.end}
            </Typography>
            <br />
            <Typography use="body2" className="info4">
              <strong>How long this will take?: </strong>
              {trip.duration}
            </Typography>
            <br />
            <Typography use="body2" className="info5">
              <strong>Aditional costs: </strong>
              {trip.costs}
            </Typography>
            <br />
            <Typography use="body2" className="info6">
              <strong>Are the ebikes Alowed?: </strong>
              {trip.ebikes ? 'YES' : 'NO'}
            </Typography>
          </span>

          <StyledImage
            src={trip.photo}
            alt={`Photo of ${trip.title}`}
            className="photo"
          />
          <Typography use="body2" className="desc">
            {trip.description}
          </Typography>
          <StyledButtonSpan className="button">
            <ButtonLink text="See All Trips!" onClick={() => routeToTripList(guideId)} />
            <ButtonMain text="Book Me Now!" onClick={() => routeToCalendar(guideId)} />
          </StyledButtonSpan>
        </StyledOneGuideGrid>
      </StyledCardWithPadding>
    );
  }
};
OneTrip.propTypes = {
  tripId: PropTypes.string.isRequired,
};
export default OneTrip;
