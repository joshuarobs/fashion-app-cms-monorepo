import { gql } from '@apollo/client';

const Insert_Item_Maindata_Revision_Change = gql`
  mutation insertItemMaindataRevisionChange(
    $revisionId: uuid!
    $changeType: data_change_types_enum!
    $toState: data_states_enum
    $action: data_actions_enum
    $userId: Int!
  ) {
    insert_item_maindata_revision_changes_one(
      object: {
        item_maindata_revision_id: $revisionId
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
      item_maindata_revision_id
      user_id
    }
  }
`;

export { Insert_Item_Maindata_Revision_Change };
