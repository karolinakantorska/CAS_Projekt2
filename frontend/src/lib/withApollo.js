import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { endpoint, prodEndpoint } from '../../config';

export default withApollo(({ headers }) => {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    //uri: 'http://localhost:4000',
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
});
