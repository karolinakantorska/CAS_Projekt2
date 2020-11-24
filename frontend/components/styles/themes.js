import {
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Hind, Arial, sans-serif',
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

export const themeStyled = {
  maxWidth: '800px',
  primaryColorButton: '#334d00',
  primaryColorWritingHell: '#ecf9ec',
  primaryColorWritingHover: '#ffffff',

  textDark: {
    primary: 'rgb(38, 38, 38)',
    secondary: 'rgb(115, 115, 115)',
  },
};
export default theme;
