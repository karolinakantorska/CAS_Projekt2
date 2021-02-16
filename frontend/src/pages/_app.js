import withApollo from '../lib/withApollo';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

import App from 'next/app';
import Page from '../components/main/Page';

import { UserStateProvider } from '../lib/userState';
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
import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';

import '@material/linear-progress/dist/mdc.linear-progress.css';

function MyApp({ Component, pageProps, apollo }) {
  //console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <UserStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </UserStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withApollo(MyApp);
/*
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
  */
