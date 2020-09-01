import Page from '../components/Page';
import App from "next/app";
import apolloClientData from '../lib/withApollo';
// import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloProvider } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';

class MyApp extends App {
  /*
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        // if component has props
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // to expose the querry to the  user
        pageProps.query = ctx.query;
        return { pageProps };
    }
    */
  render() {
    const { Component, apollo, pageProps  } = this.props;
    console.log('apollo:' , apollo)
    console.log('pageProps:', pageProps)
    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default apolloClientData(MyApp);