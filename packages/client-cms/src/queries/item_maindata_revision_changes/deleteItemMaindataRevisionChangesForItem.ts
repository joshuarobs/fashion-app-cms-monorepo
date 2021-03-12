import { gql } from '@apollo/client';

const Delete_Item_Maindata_Revision_Changes_For_Item = gql`
  mutation deleteItemMaindataRevisionChangesForItem($id: Int!) {
    delete_item_maindata_revision_changes(
      where: { item_maindata_revision: { item_id: { _eq: $id } } }
    ) {
      returning {
        id
        item_maindata_revision {
          id
        }
      }
    }
  }
`;

export { Delete_Item_Maindata_Revision_Changes_For_Item };
