import { gql } from '@apollo/client';

const Get_Item_Maindata_Revision_Changes = gql`
  query getItemMaindataRevisionChanges($id: Int!, $limit: Int!) {
    item_maindata_revision_changes(
      where: { item_maindata_revision: { item_id: { _eq: $id } } }
      order_by: { date: desc }
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
      item_maindata_revision {
        id
        item_id
        revision
        item {
          id
          # name
        }
      }
    }
  }
`;

export { Get_Item_Maindata_Revision_Changes };
