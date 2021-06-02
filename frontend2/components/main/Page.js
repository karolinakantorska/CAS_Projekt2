import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { themeStyled } from '../../styles/themes';

const DynamicComponent = dynamic(() => import('../main/Nav'), { ssr: false });
const Page = ({ children }) => {
  return (
    <ThemeProvider theme={themeStyled}>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head>
        <DynamicComponent />
        {children}
    </ThemeProvider>
  );
};

export default Page;
 