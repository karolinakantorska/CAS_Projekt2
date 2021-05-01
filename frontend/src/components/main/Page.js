import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';
import { themeStyled } from '../styles/themes';

const DynamicComponent = dynamic(() => import('../main/Nav'), { ssr: false });
const Page = ({ children }) => {
  return (
    <ThemeProvider theme={themeStyled}>
      <DynamicComponent />
      {children}
    </ThemeProvider>
  );
};

export default Page;
