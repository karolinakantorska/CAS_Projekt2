import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '@rmwc/checkbox';
import { Typography } from '@rmwc/typography';

const MyCheckbox = ({ handleChecked, specialisation, checked, i }) => {
  return (
    <StyledSpan key={i}>
      <label htmlFor={specialisation}>
        <StyledCheckbox
          id={specialisation}
          value={specialisation}
          onChange={handleChecked}
          checked={checked}
        />
        <Typography use="body2">{specialisation.replace('_', ' ')}</Typography>
      </label>
    </StyledSpan>
  );
};
const StyledCheckbox = styled(Checkbox)`
  margin: 0 -6px -6px -10px;
`;
const StyledSpan = styled.span`
  white-space: nowrap;
  margin: 0 15px 0 0px;
`;

export default MyCheckbox;
