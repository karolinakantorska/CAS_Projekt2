import Meta from './Meta';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/globalStyles';
import { themeStyled } from '../styles/themes';

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={themeStyled}>
      <Meta />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Page;
