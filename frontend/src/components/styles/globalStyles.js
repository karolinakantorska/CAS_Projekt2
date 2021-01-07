import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
  --maxWidth: 1000px;
  --colorPrimary: #212121;
  --colorSecundary:    #85929e   ;
  --colorNegativ: #ECEFF1;
  --colorWarning: #B71C1C;
  --colorLight: #B0BEC5;
  --calendarColorNumbers: #B0BEC5;
  --calendarColorNumbersLight:#B0BEC5;
  --calendarColorLight: #EEEEEE;
  --calendarColorWarning: #FFAB91;
  --fontFamilyCalendar: Yanone Kaffeesatz, Arial, sans-serif;
  --fontFamily: Hind, Arial, sans-serif;
  --mdc-theme-primary:  #282b08;
  --mdc-theme-secondary: #CDDC39
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
    background-color:   #f4f6f6  ;
    font-family: 'Hind';
  }
  a {
    text-decoration: none;
  }

`;

export default GlobalStyle;
