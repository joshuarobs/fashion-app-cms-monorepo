import { gql } from '@apollo/client';

// Gets an item maindata revision by pk
// This is used for the Overview tab for the Item page (State Frame)
const Get_Item_Maindata_Revision = gql`
  query getItemMaindataRevision($id: uuid!) {
    item_maindata_revisions_by_pk(id: $id) {
      id
      item_id
      state
      revision
      item_maindata(order_by: { is_release: desc }) {
        id
        is_release
        name
        for_gender
        brand_id
        clothing_shell_id
        item_family_id
        revision_id
        short_id
        type
      }
    }
  }
`;

export { Get_Item_Maindata_Revision };
