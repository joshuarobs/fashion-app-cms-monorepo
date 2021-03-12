import { gql } from '@apollo/client';

const Get_Item_Clothing_Shell = gql`
  query getItemClothingShell($id: Int!) {
    clothing_shells_by_pk(id: $id) {
      id
      #name
      #items_aggregate {
      #  aggregate {
      #    count
      #  }
      #}
      counts {
        id
        item_count
      }
      #default_shell_layer_id
      #default_fill_layer_id
      #default_interlining_layer_id
      #default_lining_layer_id
      created_at
      updated_at
    }
  }
`;

export { Get_Item_Clothing_Shell };
