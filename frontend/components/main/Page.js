import Meta from './Meta';
import Nav from './Nav';
import Header from './Header';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import theme, { themeStyled } from '../styles/themes';

const Page = (props) => {
  return (
    <ThemeProvider theme={themeStyled}>
      <Meta />
      <GlobalStyle />
      <Header />

      <div>{props.children}</div>
    </ThemeProvider>
  );
};

export default Page;
