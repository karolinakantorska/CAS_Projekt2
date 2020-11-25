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
      <Background>
        <div>{props.children}</div>
      </Background>
    </ThemeProvider>
  );
};

const Background = styled.div`
  color: ${(props) => props.theme.color};
`;

export default Page;
