import { gql } from '@apollo/client';

/**
 * Updates the item's updated_at field to "now"
 * This should be called after making any changes to an any item's maindata
 * or translation
 */
const Update_Item_Updated_At = gql`
  mutation updateItemUpdatedAt($id: Int!) {
    update_items_by_pk(pk_columns: { id: $id }, _set: { updated_at: "now()" }) {
      updated_at
      id
    }
  }
`;

export { Update_Item_Updated_At };
