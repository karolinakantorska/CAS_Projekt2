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
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default Page;
