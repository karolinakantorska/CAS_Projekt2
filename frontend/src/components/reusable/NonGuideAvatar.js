import React from 'react';
import styled from 'styled-components';
import { permission } from '../../lib/utils';
import { Typography } from '@rmwc/typography';

const NonGuideAvatar = ({ currentUser }) => {
  console.log('currentUser', currentUser);
  return (
    <StyledSpan>
      {currentUser.permissions === permission.admin && (
        <Typography use="body2" className="info1">
          Admin
        </Typography>
      )}
      {currentUser.permissions === permission.user && (
        <Typography use="body2" className="info1">
          {currentUser.name}
        </Typography>
      )}
    </StyledSpan>
  );
};
const StyledSpan = styled.span`
  grid-area: guide;
  display: grid;
  align-content: center;
  margin: auto;
  @media (max-width: 380px) {
  }
`;
export default NonGuideAvatar;
