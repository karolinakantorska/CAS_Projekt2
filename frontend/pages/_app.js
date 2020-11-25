import withData from '../lib/withApollo';
import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';
import Page from '../components/main/Page';

import 'fontsource-hind';
import 'fontsource-yanone-kaffeesatz';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import '@material/card/dist/mdc.card.css';
import '@material/typography/dist/mdc.typography.css';
import '@material/form-field/dist/mdc.form-field.css';
import '@material/textfield/dist/mdc.textfield.css';
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    // if component has props
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // to expose the querry to the  user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    //console.log('apollo:' , apollo)
    //console.log('pageProps:', pageProps);

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
