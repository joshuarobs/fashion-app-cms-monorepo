import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch';

// Authorization header variables (for production)
const httpLink = createHttpLink({
  uri: process.env.DB_ENDPOINT,
  // @ts-ignore
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      // authorization: token ? `Bearer ${token}` : '',
    },
  };
});

console.log('process.env.DB_ENDPOINT:', process.env.DB_ENDPOINT);

const client = new ApolloClient({
  uri: process.env.DB_ENDPOINT,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export { client };
