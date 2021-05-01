import React from 'react';
import PropTypes from 'prop-types';
// Components
import Nav from '../main/Nav';
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
// Utils
import { useGuide } from '../../apollo/querries/useGuide';
import { routeToCalendar, routeToTripList } from '../../lib/utilsRouts';
// Components for Styling
import {
  StyledCardWithPadding,
  StyledOneGuideGrid,
  StyledInfoGrid,
} from '../styles/StyledCards';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { H6, Subtitle } from '../styles/Text';
import { StyledImage } from '../styles/StyledImage';
// RMWC
import { Typography } from '@rmwc/typography';

const OneGuide = ({ guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { user } = data;
    const specialisations = user.specialisations.map((spec) =>
      ` ${spec}`.replace('_', ' '),
    );
    return (
      <>
        {/*<Nav />*/}
        <StyledCardWithPadding>
          <StyledOneGuideGrid>
            <H6 use="headline6" className="title">
              {`${user.name} ${user.surname}`}
            </H6>
            <Subtitle use="subtitle2" className="subtitle">{`${user.title}`}</Subtitle>
            <StyledInfoGrid className="info">
              <Typography use="body2">
                <strong>Home Location: </strong>
                {`${user.location}`}
              </Typography>
              <Typography use="body2">
                <strong>Ebiking: </strong>
                {` ${user.ebike ? 'YES' : 'NO'}`}
              </Typography>
              <Typography use="body2">
                <strong>Mountainbike: </strong>
                {` ${user.mtb ? 'YES' : 'NO'}`}
              </Typography>
              <Typography use="body2">
                <strong>Email:</strong>
                {`${user.email}`}
              </Typography>
              <Typography use="body2">
                <strong>Specialisation:</strong>
                {specialisations.toString()}
              </Typography>
            </StyledInfoGrid>

            <StyledImage
              src={user.photo}
              alt={`Photo of MTB Guide ${user.name} ${user.surname}`}
              className="photo"
            />
            <Typography use="body2" className="desc">
              {`${user.description}`}{' '}
            </Typography>
            <StyledButtonSpan className="button">
              <ButtonMain text="See My Trips!" onClick={() => routeToTripList(guideId)} />
              <ButtonMain text="Book Me!" onClick={() => routeToCalendar(guideId)} />
            </StyledButtonSpan>
          </StyledOneGuideGrid>
        </StyledCardWithPadding>
      </>
    );
  }
};
OneGuide.propTypes = {
  guideId: PropTypes.string,
};

export default OneGuide;
