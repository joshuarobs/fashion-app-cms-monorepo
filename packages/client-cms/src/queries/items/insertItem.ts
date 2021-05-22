import { gql } from '@apollo/client';

const Insert_Item = gql`
  mutation insertItem($name: String!, $item_type: item_types_enum!) {
    insertItem(name: $name, item_type: $item_type) {
      id
      created_at
      updated_at
    }
  }
`;

export { Insert_Item };
