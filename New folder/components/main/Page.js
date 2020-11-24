import Meta from './Meta';
import Nav from './Nav';
import Header from './Header';
//import styled, { ThemeProvider } from 'styled-components';




//import GlobalStyle from '../styles/globalStyles';
//import theme from '../styles/themes';


/*
const theme = createMuiTheme({
  overrides: {
    MuiLinearProgress: {},
  },
  palette: {
    primary: {
      main: '#334d00',
    },
  },
});
*/
/*
const Inner = styled.div`
  color: ${(props) => props.theme.color};
  width: ${(props) => props.theme.maxWidth};
  margin: auto;
`;
*/
const Page = (props) => {
  return (
    <div>
      <Meta />


      {/*<Nav />*/}
      <div>Color Test{props.children}</div>
    </div>
  );
};

export default Page;
