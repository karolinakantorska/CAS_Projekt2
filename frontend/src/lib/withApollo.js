import { ApolloClient, ApolloLink, InMemoryCache, makeVar } from '@apollo/client';
//import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
// NEW Instaled
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../../config';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      createUploadLink({
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      }),
    ]),
    cache: new InMemoryCache({}),
    connectToDevTools: true,
  });
}

export default withApollo(createClient, { getDataFromTree });
