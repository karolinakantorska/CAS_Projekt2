import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
    --mdc-theme-primary:  #282b08;
    --mdc-theme-secondary: #CDDC39;
/*
    --mdc-theme-primary: #5d1049;
  --mdc-theme-secondary: #fa3336;
  --mdc-theme-error: #b00020;
  --mdc-theme-background: #fff;
  --mdc-theme-surface: #fff;
  --mdc-theme-on-primary: rgba(255, 255, 255, 1);
  --mdc-theme-on-secondary: rgba(255, 255, 255, 1);
  --mdc-theme-on-surface: rgba(0, 0, 0, 0.87);
  --mdc-theme-on-error: #fff;
  --mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);
  --mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);
  --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);
  --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);
  --mdc-theme-text-primary-on-dark: white;
  --mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);
  --mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);
  --mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);
  --mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5);
*/
}

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: auto;
      background-color: #f8fce9;
    font-family: 'Hind';
  }
  a {
    text-decoration: none;
  }

`;

export default GlobalStyle;
