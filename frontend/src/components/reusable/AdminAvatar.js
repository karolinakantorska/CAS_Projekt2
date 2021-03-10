import React from 'react';
import styled from 'styled-components';

import { StyledTextBody1 } from '../styles/StyledText';

const AdminAvatar = () => {
  return (
    <StyledSpan>
      <StyledTextBody1>Admin</StyledTextBody1>
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
