import Page from '../components/Page';
import App from "next/app";
import apolloClientData from '../lib/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloProvider } from '@apollo/client';
// import { ApolloProvider } from 'react-apollo';
import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "styled-components";
import styled from "styled-components";

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        // if component has props
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // to expose the querry to the  user
        pageProps.query = ctx.query;
        return { pageProps };
    };



  render() {
    const { Component, apollo, pageProps  } = this.props;
    console.log('apollo:' , apollo)
    console.log('pageProps:', pageProps)

    const baseTheme = {
      color: "green",
      backgroundColor: "white",
    };
    const Foo = ({ children }) => {
      const themeContext = useContext(ThemeContext);
      return <div style={themeContext}>{children}</div>;
    };
        const Button = styled.button`
          font-size: 12px;
          margin: 5px;
          padding: 6px;
          border-radius: 3px;
          color: ${(props) => props.theme.main};
          border: 2px solid ${(props) => props.theme.main};
        `;
        const theme = {
          main: "green",
        };


    return (
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={baseTheme}>
          <Foo>
            <Page>
              <Component {...pageProps} />
            </Page>
            <ThemeProvider theme={theme}>
              <div>
                <Button theme={{ main: "blue" }}>Foo</Button>
                <Button>Baz</Button>
                <Button theme={{ main: "red" }}>Bar</Button>
              </div>
            </ThemeProvider>
          </Foo>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default apolloClientData(MyApp);