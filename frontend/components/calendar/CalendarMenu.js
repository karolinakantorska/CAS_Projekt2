import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '@rmwc/icon-button';
import { Button } from '@rmwc/button';

import { StyledButtons, StyledButton } from '../styles/StyledForm';
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
    <StyledButtonsMenu>
      <StyledSpan>
        {
          // button inactive in current month
          currentYear === selectedYear &&
          currentMonth === selectedMonth ? (
            <StyledIconButton
              icon="arrow_left"
              className="left_button"
              disabled
            >
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
        <StyledMonthChangeButton>
          {selectedMonth}
        </StyledMonthChangeButton>
        <StyledIconButton
          //icon="arrow_forward_ios"
          icon="arrow_right"
          onClick={() => handleMonthChange(1)}
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
  handleYearChange: PropTypes.func,
};
const StyledButtonsMenu = styled.div`
  grid-column: 2 / span 1;
  display: grid;
  padding: 1rem 0.8rem 1rem 0.8rem;
  width: 100%;
  margin: auto;
  ::before {
    content: '';
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: ${(props) => props.theme.colorTextCalendar.light};
  }
  ::after {
    content: '';
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: ${(props) => props.theme.colorTextCalendar.light};
  }
`;
const StyledSpan = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .left_button {
    justify-self: end;
  }
`;
const StyledMonthChangeButton = styled.div`
  max-width: 250px;
  text-transform: capitalize;
  font-size: 1.2rem;
  align-self: center;
  color: ${(props) => props.theme.colorText.primary};
`;

const StyledIconButton = styled(IconButton)`
  font-size: 2rem;
  color: ${(props) => props.theme.colorText.primary};
  padding: 0;
`;

export default CalendarMenu;
