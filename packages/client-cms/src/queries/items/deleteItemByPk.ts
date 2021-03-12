import { gql } from '@apollo/client';

// Deletes an item entry by primary key
// This should only be used after every other item maindata revision,
// translations, activity logs, permission matrices, etc. are all deleted
// Otherwise it won't work
const Delete_Item_By_Pk = gql`
  mutation deleteItemByPk($id: Int!) {
    delete_items_by_pk(id: $id) {
      id
    }
  }
`;

export { Delete_Item_By_Pk };
