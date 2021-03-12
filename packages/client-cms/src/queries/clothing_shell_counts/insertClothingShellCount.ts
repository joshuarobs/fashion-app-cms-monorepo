import { gql } from '@apollo/client';

const Insert_Clothing_Shell_Count = gql`
  mutation insertClothingShellCount($clothingShellId: Int!) {
    insert_clothing_shell_counts_one(
      object: { clothing_shell_id: $clothingShellId }
    ) {
      id
      clothing_shell_id
      item_count
    }
  }
`;

export { Insert_Clothing_Shell_Count };
