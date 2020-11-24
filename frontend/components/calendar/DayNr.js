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
      <Typography variant="h4" color="textSecondary" align="left">
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

export default DayNr;
