import { gql } from '@apollo/client';

const Get_Item_Global_Media_Revision_Changes_Given_Item_Id = gql`
  query getItemGlobalMediaRevisionChangesGivenItemId(
    $item_id: Int!
    $limit: Int
  ) {
    getItemGlobalMediaRevisionChangesGivenItemId(
      item_id: $item_id
      limit: $limit
    ) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
      }
      item_global_media_revision {
        id
        item_id
        revision
      }
    }
  }
`;

export { Get_Item_Global_Media_Revision_Changes_Given_Item_Id };
