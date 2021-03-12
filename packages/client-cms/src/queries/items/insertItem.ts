import { gql } from '@apollo/client';

const Insert_Item = gql`
  mutation newItem {
    insert_items_one(object: {}) {
      id
      created_at
      updated_at
    }
  }
`;

export { Insert_Item };
