import { gql } from '@apollo/client';

const Update_Clothing_Shell_Count_By_Clothing_Shell_Id = gql`
  mutation updateClothingShellCountByClothingShellId(
    $clothingShellId: Int!
    $changes: clothing_shell_counts_set_input
  ) {
    update_clothing_shell_counts(
      where: { clothing_shell_id: { _eq: $clothingShellId } }
      _set: $changes
    ) {
      returning {
        id
        clothing_shell_id
        item_count
      }
    }
  }
`;

export { Update_Clothing_Shell_Count_By_Clothing_Shell_Id };
