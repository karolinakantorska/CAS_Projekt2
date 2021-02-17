import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DayNr = ({ dayOfMonth, highlight }) => {
  return (
    <StyledNrSpan className={`'calendar_font' ${highlight && 'highlight'}`}>
      {dayOfMonth}
    </StyledNrSpan>
  );
};

DayNr.propTypes = {
  dayOfMonth: PropTypes.string,
  highlight: PropTypes.bool,
};
const StyledNrSpan = styled.span`
  display: grid;
  color: var(--calendarColorNumbersLight);
  font-size: 1.9rem;
  padding: 0.4rem 0 0 0.2rem;
  line-height: 0.6;
  .highlight {
    color: var(--calendarColorWarning);
  }
  @media (max-width: 840px) {
    font-size: 1.6rem;
    padding: 0.2rem 0 0 0.2rem;
    color: var(--colorSecundary);
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;
export default DayNr;
