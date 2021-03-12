import { gql } from '@apollo/client';

// Deletes all the maindata for an item
// This is used for the Settings tab for the Item page (Delete item)
const Delete_Item_Maindata_Revisions_For_Item = gql`
  mutation deleteItemMaindataRevisionsForItem($id: Int!) {
    delete_item_maindata_revisions(where: { item_id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export { Delete_Item_Maindata_Revisions_For_Item };
