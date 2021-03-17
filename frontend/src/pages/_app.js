//import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/main/Page';
import withApollo from '../lib/withApollo';
import { UserStateProvider } from '../lib/userState';

import 'fontsource-hind';
import 'fontsource-yanone-kaffeesatz';

import '@material/button/dist/mdc.button.css';
// arrows in calendar menu
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/card/dist/mdc.card.css';
//import '@material/form-field/dist/mdc.form-field.css';
import '@material/textfield/dist/mdc.textfield.css';
// for textfield
import '@material/ripple/dist/mdc.ripple.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@rmwc/icon/icon.css';
import '@material/elevation/dist/mdc.elevation.css';
import '@rmwc/select/select.css';
import '@material/select/dist/mdc.select.css';
import '@rmwc/avatar/avatar.css';
import '@material/theme/dist/mdc.theme.css';
import '@rmwc/theme/theme.css';
import '@material/dialog/dist/mdc.dialog.css';
import '@material/list/dist/mdc.list.css';
import '@material/linear-progress/dist/mdc.linear-progress.css';
import '@rmwc/circular-progress/circular-progress.css';
import '@material/typography/dist/mdc.typography.css';
import { RMWCProvider } from '@rmwc/provider';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <RMWCProvider
        typography={{
          headline6: 'h6',
          body1: 'p',
        }}
      >
        {/*<UserStateProvider>*/}
        <Page>
          <Component {...pageProps} />
        </Page>
        {/*</UserStateProvider>*/}
      </RMWCProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  //console.log('ctx', ctx);
  //console.log('ctx.req', ctx.req);
  //console.log('ctx.pathname', ctx.pathname);
  return { pageProps };
};

export default withApollo(MyApp);
