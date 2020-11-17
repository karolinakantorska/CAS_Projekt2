import React from 'react';
import PropTypes from 'prop-types';

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
    <section>
      <section>
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
      <section>
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
        {selectedMonth}
        <button onClick={() => handleMonthChange(1)}>&#8594;</button>
      </section>
    </section>
  );
};
CalendarMenu.propTypes = {
  currentYear: PropTypes.string,
  selectedYear: PropTypes.string,
  currentMonth: PropTypes.string,
  selectedMonth: PropTypes.string,
  handleMonthChange: PropTypes.string,
  handleYearChange: PropTypes.string,
};

export default CalendarMenu;
