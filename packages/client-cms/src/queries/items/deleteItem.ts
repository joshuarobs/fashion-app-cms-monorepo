import { gql } from '@apollo/client';

const Delete_Item = gql`
  mutation deleteItem($id: Int!) {
    deleteItem(id: $id) {
      id
      created_at
      updated_at
    }
  }
`;

export { Delete_Item };
