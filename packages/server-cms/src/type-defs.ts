import { gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Query {
    hello: String
    getItemsForItemsTableLatest: [Items]
    getBaseColours: [base_colours]
  }

  type Items {
    id: Int
  }

  type base_colours {
    value: String!
    description: String
  }
`;

export { typeDefs };
