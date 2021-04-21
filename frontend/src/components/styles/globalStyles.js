import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
  --maxWidth: 1000px;
  --marginTop: 60px;
  --colorPrimary: #212121;
  --colorSecundary:    #5C6267;
  --colorNegativ: #ECEFF1;
  --colorWarning: #B71C1C;
  --colorAccept: #006600;
  --colorLight: #B0BEC5;
  --calendarColorNumbers: #B0BEC5;
  --calendarColorNumbersLight:#B0BEC5;
  --calendarColorLight: #EEEEEE;
  --calendarColorWarning: #FFAB91;
  --fontFamilyCalendar: Yanone Kaffeesatz, Arial, sans-serif;
  --fontFamily: Hind, Arial, sans-serif;
  --mdc-theme-primary:  #282b08;
  --mdc-theme-secondary: #CDDC39;
  
  --col1: #BBCC33;
  --col2: #AAAA00;
  --col3:#EE8765;
  --col4: #77AADD;
  --col5: #EEDD88;
  --col6:#FFAABB;
  --col7: #99DDFF;
  --col8: #44BB99;
  --col9: #DDDDDD;
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
  
  .backgroungImage {
  background: url('https://res.cloudinary.com/karolinauploads/image/upload/v1607789948/background1440x810.jpg')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  @media (max-width: 1280px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1608111607/backgroundBikerBW1280x720.png');
  }
  @media (max-width: 1439px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1608111608/background1440x810.png');
  }
  @media (min-width: 1440px), img {
    background-image: url('https://res.cloudinary.com/karolinauploads/image/upload/v1608111608/backgroundBikerBW1600x900.png');
  }
  }

  
  a {
    text-decoration: none;
  }
  .calendar_font {
    font-family: Yanone Kaffeesatz, Arial, sans-serif
  }
`;

export default GlobalStyle;
