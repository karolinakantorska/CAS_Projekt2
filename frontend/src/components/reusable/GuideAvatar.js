import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LoadingCicle from '../reusable/LoadingCicle';
import ErrorGraphql from '../reusable/ErrorGraphql';

import { useGuide } from '../../apollo/querries/useGuide';
import { routeToGuideDetails } from '../../lib/utilsRouts';

import { Avatar } from '@rmwc/avatar';
import { Typography } from '@rmwc/typography';

const GuideAvatar = ({ guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  if (loading) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <StyledSpan>
        <StyledAvatar
          src={data.user.photo}
          size="xlarge"
          interactive
          onClick={() => routeToGuideDetails(guideId)}
        />
        <Typography use="body2" className="info1">
          {`${data.user.name} ${data.user.surname}`}
        </Typography>
      </StyledSpan>
    );
  }
};
const StyledSpan = styled.span`
  grid-area: guide;
  display: grid;
  grid-auto-flow: row;
  align-content: center;
  margin-left: 20px;
  margin-top: -20px;
  @media (max-width: 380px) {
    margin-left: 50px;
  }
`;
const StyledAvatar = styled(Avatar)`
  width: 52px;
  height: 52px;
  border: solid 1px lightgray;
  @media (max-width: 380px) {
    display: none;
  }
`;
GuideAvatar.propTypes = {
  guideId: PropTypes.string,
};
export default GuideAvatar;
