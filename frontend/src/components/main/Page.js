import styled from 'styled-components';
import Meta from './Meta';
import Nav from '../main/Nav';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { themeStyled } from '../styles/themes';

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={themeStyled}>
      <Meta />
      <GlobalStyle />
      <Nav />
      {children}
    </ThemeProvider>
  );
};

export default Page;
