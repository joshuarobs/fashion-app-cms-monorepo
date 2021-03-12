import { gql } from '@apollo/client';

const Update_Clothing_Shell_Count = gql`
  mutation updateClothingShellCount(
    $id: Int!
    $changes: clothing_shell_counts_set_input
  ) {
    update_clothing_shell_counts_by_pk(
      pk_columns: { id: $id }
      _set: $changes
    ) {
      id
      clothing_shell_id
      item_count
    }
  }
`;

export { Update_Clothing_Shell_Count };
