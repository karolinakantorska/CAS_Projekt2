import Meta from './Meta';
import Header from './Header';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { themeStyled } from '../styles/themes';

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={themeStyled}>
      <Meta />
      <GlobalStyle />
      <Header />
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default Page;
