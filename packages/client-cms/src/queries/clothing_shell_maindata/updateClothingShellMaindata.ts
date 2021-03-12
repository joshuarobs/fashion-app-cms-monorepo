import { gql } from '@apollo/client';

const Update_Clothing_Shell_Maindata = gql`
  mutation updateClothingShellMaindata(
    $id: uuid!
    $changes: clothing_shell_maindata_set_input
  ) {
    update_clothing_shell_maindata_by_pk(
      pk_columns: { id: $id }
      _set: $changes
    ) {
      id
      name
      uniform_thickness
      default_shell_layer_id
      default_fill_layer_id
      default_lining_layer_id
      default_interlining_layer_id
      item_type
      clothing_segment_data_id
      clothing_segment_data {
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

export { Update_Clothing_Shell_Maindata };
