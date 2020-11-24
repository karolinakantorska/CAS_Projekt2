import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { themeFontNumbers } from '../styles/themes';

const DayNr = (props) => {
  const { dayOfMonth, highlight } = props;
  return highlight ? (
    <ThemeProvider theme={themeFontNumbers} variant="h1" gutterBottom>
      <Typography variant="h4" color="textSecondary">
        {dayOfMonth}
      </Typography>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={themeFontNumbers} variant="h1" gutterBottom>
      <Typography variant="h4" color="textPrimary">
        {dayOfMonth}
      </Typography>
    </ThemeProvider>
  );
};

DayNr.propTypes = {
  dayOfMonth: PropTypes.string,
  highlight: PropTypes.bool,
};
const StyledNrSpan = styled.span`
  display: grid;
  font-family: 'Yanone Kaffeesatz', 'sans-serif';
  font-size: 1.8rem;
  line-height: 0.6;
  .highlight {
    color: #ef5350;
  }
`;
const StyledNrSpan2 = styled(Typography)`
  && {
    line-height: 0.6;
  }
`;

export default DayNr;
