import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CalendarMenu = (props) => {
  const {
    currentYear,
    selectedYear,
    currentMonth,
    selectedMonth,
    handleMonthChange,
    handleYearChange,
  } = props;

  return (
    <StyledSpan>
      {
        // button inactive in current month
        currentYear === selectedYear &&
        currentMonth === selectedMonth ? (
          <button disabled>&#8592;</button>
        ) : (
          <button onClick={() => handleMonthChange(-1)}>
            &#8592;
          </button>
        )
      }
      <span>{selectedMonth}</span>
      <button onClick={() => handleMonthChange(1)}>&#8594;</button>
    </StyledSpan>
  );
};
CalendarMenu.propTypes = {
  currentYear: PropTypes.string,
  selectedYear: PropTypes.string,
  currentMonth: PropTypes.string,
  selectedMonth: PropTypes.string,
  handleMonthChange: PropTypes.func,
  handleYearChange: PropTypes.func,
};
const StyledSpan = styled.span`
  display: grid;
  grid-auto-flow: column;
`;
export default CalendarMenu;
/*      <section>
        {
          // button inactive in current month
          currentYear === selectedYear &&
          currentMonth === selectedMonth ? (
            <button disabled>&#8592;</button>
          ) : (
            <button onClick={() => handleYearChange(-1)}>
              &#8592;
            </button>
          )
        }
        {selectedYear}
        <button onClick={() => handleYearChange(1)}>&#8594;</button>
      </section>

      grid-column: 1/-1;
      */
