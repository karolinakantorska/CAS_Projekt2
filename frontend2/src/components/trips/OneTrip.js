import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// Components
import GuideAvatar from '../reusable/GuideAvatar';
import Nav from '../main/Nav';
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
// Utils
import { noUser } from '../../lib/utils';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useTrip } from '../../apollo/querries/useTrip';
import { difficulties } from '../../lib/utils';
import { routeToCalendar, routeToTripList } from '../../lib/utilsRouts';
import { useHydratationFix } from '../../lib/useHydratationFix';
// Components for Styling
import {
  StyledCardWithPadding,
  StyledOneGuideGrid,
  StyledInfoGrid,
} from '../../styles/StyledCards';
import { StyledButtonSpan } from '../../styles/StyledButtonSpan';
import { H6, Subtitle } from '../../styles/Text';
import { StyledImage } from '../../styles/StyledImage';
// RMWC
import { Typography } from '@rmwc/typography';
import { StyledContainer } from '../../styles/StyledContainer';
const OneTrip = ({ tripId }) => {
  const { loading, error, data } = useTrip(tripId);
    const {
      loading: loadingCurrentUser,
      error: errorCurrentUser,
      data: dataCurrentUser,
    } = useCurrentUser();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { trip } = data;
        const currentUser = dataCurrentUser.currentUser
          ? dataCurrentUser.currentUser
          : noUser;
    return (
      <StyledContainer>
        <StyledCardWithPadding>
          <StyledOneGuideGrid>
            <H6 use="headline6" className="title">
              {trip.title}
            </H6>
            <Subtitle use="subtitle2" className="subtitle">
              {trip.special}
            </Subtitle>
            <StyledInfoGrid className="info">
              {trip.guide && (
                <>
                  <Typography use="body2">
                    <strong>Trip added by:</strong>
                  </Typography>
                  <StyledDiv>
                    <GuideAvatar guideId={trip.guide.id} />
                  </StyledDiv>
                </>
              )}
              <Typography use="body2">
                <strong>Difficoulty Level: </strong>
                {difficulties[trip.difficulty]}
              </Typography>

              <Typography use="body2">
                <strong>Meeting Point: </strong>
                {trip.start}
              </Typography>

              <Typography use="body2">
                <strong>End Point: </strong>
                {trip.end}
              </Typography>

              <Typography use="body2">
                <strong>How long this will take?: </strong>
                {trip.duration}
              </Typography>

              <Typography use="body2">
                <strong>Do you need to book a whole day? </strong>
                {` ${trip.wholeDay ? 'YES' : 'NO'}`}
              </Typography>

              <Typography use="body2">
                <strong>Aditional costs: </strong>
                {trip.costs}
              </Typography>

              <Typography use="body2">
                <strong>Are the ebikes Alowed?: </strong>
                {trip.ebikes ? 'YES' : 'NO'}
              </Typography>
            </StyledInfoGrid>
            <StyledImage
              src={trip.photo}
              alt={`Photo of ${trip.title}`}
              className="photo"
            />
            <Typography use="body2" className="desc">
              {trip.description}
            </Typography>
            <StyledButtonSpan className="button">
              <ButtonMain
                text="See All Trips!"
                onClick={() => routeToTripList(trip.guide.id)}
              />
              <ButtonMain
                text={currentUser.id === trip.guide.id ? 'Your Trip' : 'Book This Trip!'}
                onClick={() => routeToCalendar(trip.guide.id, tripId)}
                disabled={currentUser.id === trip.guide.id ? true : false}
              />
            </StyledButtonSpan>
          </StyledOneGuideGrid>
        </StyledCardWithPadding>
      </StyledContainer>
    );
  }
};
OneTrip.propTypes = {
  tripId: PropTypes.string.isRequired,
};
export const StyledDiv = styled.div`
  margin-top: 20px;
`;
export default OneTrip;
