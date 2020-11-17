import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: auto;
    background-color: mintcream;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;