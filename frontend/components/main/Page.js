import Meta from './Meta';
import Nav from './Nav';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';

const theme = {
  maxWidth: '800px',
  color: 'red',
  primaryColorButton: '#334d00',
  primaryColorWritingHell: '#ecf9ec',
  primaryColorWritingHover: '#ffffff',
};

const Inner = styled.div`
  color: ${(props) => props.theme.color};
  width: ${(props) => props.theme.maxWidth};
  margin: auto;
`;
const Page = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <GlobalStyle />
      <Nav />
      <Inner>Color Test{props.children}</Inner>
    </ThemeProvider>
  );
};



export default Page;
