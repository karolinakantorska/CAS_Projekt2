import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Avatar } from '@rmwc/avatar';
import { CircularProgress } from '@rmwc/circular-progress';
import Error from '../reusable/Error';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';

const GuideAvatar = ({ guideId }) => {
  const { loading, error, data } = useQuery(ONE_USER_QUERY, {
    variables: { id: guideId },
  });
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return (
      <StyledSpan>
        <StyledAvatar src={data.user.photo} size="xlarge" interactive />
      </StyledSpan>
    );
  }
};
const StyledSpan = styled.span`
  display: grid;
  grid-auto-flow: row;
  align-content: center;
  margin-left: 20px;
  margin-top: -20px;
`;
const StyledAvatar = styled(Avatar)`
  width: 68px;
  height: 68px;
  border: solid 1px lightgray;
`;
GuideAvatar.propTypes = {
  guideId: PropTypes.string.required,
};

export default GuideAvatar;
//
