import { gql } from '@apollo/client';

const Update_Item_Maindata = gql`
  mutation updateItemMaindata($id: uuid!, $changes: item_maindata_set_input) {
    update_item_maindata_by_pk(pk_columns: { id: $id }, _set: $changes) {
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
