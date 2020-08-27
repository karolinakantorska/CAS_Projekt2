
import Page from '../components/Page';
import App from "next/app";
//import { ApolloProvider} from 'react-apollo';
import apolloClientData from '../lib/withApollo';
import { ApolloProvider } from "@apollo/react-hooks";

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
    const { Component, apollo, props } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...props} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default apolloClientData(MyApp);