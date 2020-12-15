import withApollo from '../lib/withApollo';
//import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/client';
//import { ApolloProvider } from '@apollo/react-common';
import App from 'next/app';
import Page from '../components/main/Page';

import 'fontsource-hind';
import 'fontsource-yanone-kaffeesatz';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/card/dist/mdc.card.css';
import '@material/form-field/dist/mdc.form-field.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@rmwc/icon/icon.css';
import '@material/elevation/dist/mdc.elevation.css';
import '@material/radio/dist/mdc.radio.css';
import '@rmwc/select/select.css';
import '@material/select/dist/mdc.select.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@rmwc/avatar/avatar.css';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/theme/theme.css';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

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

export default withApollo(MyApp);
