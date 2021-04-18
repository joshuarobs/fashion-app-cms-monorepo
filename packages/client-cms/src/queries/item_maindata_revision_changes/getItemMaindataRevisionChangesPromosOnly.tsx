import { gql } from '@apollo/client';

const Get_Item_Maindata_Revision_Changes_Promos_Only = gql`
  query getItemMaindataRevisionChangesPromosOnly(
    $itemId: Int!
    $revision: Int!
  ) {
    getItemMaindataRevisionChangesPromosOnly(
      itemId: $itemId
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
      item_maindata_revision_id
      item_maindata_revision {
        id
        item_id
        revision
        #item {
        #  id
        # name
        #}
      }
    }
  }
`;

export { Get_Item_Maindata_Revision_Changes_Promos_Only };
