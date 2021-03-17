import React from 'react';
import styled from 'styled-components';
import { Typography } from '@rmwc/typography';

const AdminAvatar = () => {
  return (
    <StyledSpan>
      <Typography use="body2" className="info1">
        Admin
      </Typography>
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
export default AdminAvatar;
