import Meta from './Meta';
import Nav from './Nav';
import Header from './Header';
import styled from 'styled-components';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LinearProgress } from '@material-ui/core';
import GlobalStyle from '../styles/globalStyles';
import theme, { themeStyled } from '../styles/themes';

const Inner = styled.div`
  //color: ${(props) => props.theme.color};
  //width: ${(props) => props.theme.maxWidth};
  margin: auto;
`;

const Page = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <GlobalStyle />
      <Header />
      <Nav />
      <Inner>Color Test{props.children}</Inner>
    </ThemeProvider>
  );
};

export default Page;
