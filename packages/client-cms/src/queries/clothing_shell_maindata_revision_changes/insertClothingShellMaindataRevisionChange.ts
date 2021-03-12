import { gql } from '@apollo/client';

const Insert_Clothing_Shell_Maindata_Revision_Change = gql`
  mutation insertClothingShellMaindataRevisionChange(
    $revisionId: uuid!
    $changeType: data_change_types_enum!
    $toState: data_states_enum
    $action: data_actions_enum
    $userId: Int!
  ) {
    insert_clothing_shell_maindata_revision_changes_one(
      object: {
        clothing_shell_maindata_revision_id: $revisionId
        change_type: $changeType
        to_state: $toState
        action: $action
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

export { Insert_Clothing_Shell_Maindata_Revision_Change };
