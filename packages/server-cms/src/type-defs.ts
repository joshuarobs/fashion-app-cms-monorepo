import { join } from 'path';
import { readFileSync } from 'fs';
import { gql } from 'apollo-server';
import { importSchema } from 'graphql-import';

/*
 * REMINDER: When importing, remove the first "schema" section from the
 * `schema.graphql` file. It's the first 5 lines that look like this:
 *
 * schema {
 *   query: query_root
 *   mutation: mutation_root
 *   subscription: subscription_root
 * }
 *
 * If you don't do this, it won't work.
 * */

const typeDefs2 = importSchema(join(__dirname, '../schema.graphql'));
// console.log('typeDefs2:', typeDefs2);

const pre = `   type base_colours {
      value: String!
      description: String
    }`;

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

  ${typeDefs2}

  #  type base_colours {
  #    value: String!
  #    description: String
  #  }
  #
  #  type body_groups {
  #    value: String!
  #    description: String
  #    body_segments: body_segments
  #  }
  #
  #  type body_segment_masks {
  #    id: Int!
  #    body_segment_mask_shape: String!
  #    fill_percent: Int!
  #    uniform_segment_thickness: Int
  #    shell_layer_id: Int
  #    fill_layer_id: Int
  #    lining_layer_id: Int
  #    interlining_layer_id: Int
  #    body_segment_id: Int!
  #  }
  #
  #  type body_segments {
  #    id: Int!
  #    name: String
  #    body_group: String!
  #  }
  #
  #  type clothing_segment_bounds {
  #    value: Int!
  #  }
  #
  #  type clothing_segment_data {
  #    id: String!
  #    right_sleeve_start_front: Int
  #    right_sleeve_end_front: Int
  #    right_sleeve_start_back: Int
  #    right_sleeve_end_back: Int
  #    left_sleeve_start_front: Int
  #    left_sleeve_end_front: Int
  #    left_sleeve_start_back: Int
  #    left_sleeve_end_back: Int
  #    right_body_start_front: Int
  #    right_body_end_front: Int
  #    right_body_start_back: Int
  #    right_body_end_back: Int
  #    left_body_start_front: Int
  #    left_body_end_front: Int
  #    left_body_start_back: Int
  #    left_body_end_back: Int
  #    sleeves_is_symmetrical: Boolean!
  #    sleeves_front_back_is_same: Boolean!
  #    body_is_symmetrical: Boolean!
  #    body_front_back_is_same: Boolean!
  #  }
`;

export { typeDefs };
