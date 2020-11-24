import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Hind, Arial, sans-serif',
  },
  palette: {
    primary: {
      light: '#90A4AE',
      main: '#607D8B',
      dark: '#263238',
      contrastText: '#fff',
    },
    text: {
      primary: '#263238',
      secondary: '#607D8B,',
    },
  },
});
theme = responsiveFontSizes(theme);

export let themeFontNumbers = createMuiTheme({
  typography: {
    fontFamily: ['Yanone Kaffeesatz', 'sans-serif'].join(','),
    h4: {
      lineHeight: 0.7,
    },
  },
  palette: {
    text: {
      primary: '#B0BEC5',
      secondary: '#ef5350',
    },
  },
});
themeFontNumbers = responsiveFontSizes(themeFontNumbers);

/*
export const themeStyled = {
  fontFamilyCalendar: 'Yanone Kaffeesatz, Arial, sans-serif',
  textCalendar: {
    primary: '#B0BEC5',
    secondary: '#90A4AE',
    warning: '#ef5350',
    black: '#263238',
  },
};
*/
export default theme;
