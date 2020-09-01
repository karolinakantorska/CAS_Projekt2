import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { endpoint } from '../config';


export default withApollo (
    ({ initialState }) => {
        return new ApolloClient({
            uri:'http://localhost:4000',
            cache: new InMemoryCache().restore(initialState|| {}) 
        });
    });

/*
function createClient ({ headers }) {
    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers,
            });
        },
    });
}

export default withApollo(createClient);
*/