import { gql } from '@apollo/client';

const Get_Item_Global_Media_Revision_Changes_Promos_Only = gql`
  query getItemGlobalMediaRevisionChangesPromosOnly(
    $item_id: Int!
    $revision: Int!
  ) {
    getItemGlobalMediaRevisionChangesPromosOnly(
      item_id: $item_id
      revision: $revision
    ) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
        email
      }
    }
  }
`;

export { Get_Item_Global_Media_Revision_Changes_Promos_Only };
