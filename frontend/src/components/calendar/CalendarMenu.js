import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { IconButton } from '@rmwc/icon-button';

const CalendarMenu = ({
  currentYear,
  selectedYear,
  currentMonth,
  selectedMonth,
  handleMonthChange,
}) => {
  return (
    <StyledButtonsMenu>
      <StyledSpan>
        {
          // button inactive in current month
          currentYear === selectedYear && currentMonth === selectedMonth ? (
            <StyledIconButton icon="arrow_left" className="left_button" disabled>
              &#8592;
            </StyledIconButton>
          ) : (
            <StyledIconButton
              icon="arrow_left"
              className="left_button"
              onClick={() => handleMonthChange(-1)}
            >
              &#8592;
            </StyledIconButton>
          )
        }
        <StyledMonthChangeButton>{selectedMonth}</StyledMonthChangeButton>
        <StyledIconButton
          icon="arrow_right"
          onClick={() => handleMonthChange(1)}
          className="right_button"
        >
          &#8594;
        </StyledIconButton>
      </StyledSpan>
    </StyledButtonsMenu>
  );
};
CalendarMenu.propTypes = {
  currentYear: PropTypes.string,
  selectedYear: PropTypes.string,
  currentMonth: PropTypes.string,
  selectedMonth: PropTypes.string,
  handleMonthChange: PropTypes.func,
};
const StyledButtonsMenu = styled.div`
  grid-area: month;
  display: grid;
  padding: 16px 8px 25px 8px;
  ::before {
    content: '';
    height: 2px;
    border-radius: 2px;
    background: var(--calendarColorLight);
  }
  ::after {
    content: '';
    height: 2px;
    border-radius: 2px;
    background: var(--calendarColorLight);
  }
`;
const StyledSpan = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .left_button {
    justify-self: start;
  }
  .right_button {
    justify-self: end;
  }
`;
const StyledMonthChangeButton = styled.div`
  max-width: 250px;
  text-transform: capitalize;
  font-size: 1.2rem;
  align-self: center;
  justify-self: center;
`;

const StyledIconButton = styled(IconButton)`
  font-size: 48px;
  padding: 0;
`;

export default CalendarMenu;
