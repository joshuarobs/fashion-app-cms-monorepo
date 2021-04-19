import { gql } from '@apollo/client';

const Update_Item_Maindata = gql`
  mutation updateItemMaindata($id: String!, $changes: item_maindata_set_input) {
    updateItemMaindata(id: $id, changes: $changes) {
      id
      name
      short_id
      type
      brand_id
      for_gender
      clothing_shell_id
      clothing_shell {
        id
        #items_aggregate {
        #  aggregate {
        #    count
        #  }
        #}
      }
    }
  }
`;

export { Update_Item_Maindata };
