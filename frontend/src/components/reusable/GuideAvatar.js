import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Avatar } from '@rmwc/avatar';
import LoadingCicle from '../reusable/LoadingCicle';
import Error from '../reusable/Error';
import { useGuide } from '../../apollo/querries/useGuide';
import { StyledTextBody2 } from '../styles/StyledText';

const GuideAvatar = ({ guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  if (loading) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return (
      <StyledSpan>
        <StyledAvatar src={data.user.photo} size="xlarge" interactive />
        <StyledTextBody2>{`${data.user.name} ${data.user.surname}`}</StyledTextBody2>
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
  guideId: PropTypes.string.required,
};

export default GuideAvatar;
//
