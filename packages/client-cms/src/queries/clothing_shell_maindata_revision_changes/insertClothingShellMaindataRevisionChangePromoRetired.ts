import { gql } from '@apollo/client';

const Insert_Clothing_Shell_Maindata_Revision_Change_Promo_Retired = gql`
  mutation insertClothingShellMaindataRevisionChangePromoRetired(
    $revisionId: uuid!
    $userId: Int!
  ) {
    insert_clothing_shell_maindata_revision_changes_one(
      object: {
        clothing_shell_maindata_revision_id: $revisionId
        change_type: Promotion
        to_state: Retired
        user_id: $userId
      }
    ) {
      id
      date
      action
      change_type
      to_state
      clothing_shell_maindata_revision_id
      user_id
    }
  }
`;

export { Insert_Clothing_Shell_Maindata_Revision_Change_Promo_Retired };
