import { gql } from '@apollo/client';

const Insert_Item_Translation_Revision_Change = gql`
  mutation insertItemTranslationRevisionChange(
    $revisionId: uuid!
    $changeType: data_change_types_enum!
    $toState: data_states_enum
    $action: data_actions_enum
    $userId: Int!
  ) {
    insert_item_translation_revision_changes_one(
      object: {
        item_translation_revision_id: $revisionId
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
      item_translation_revision_id
      user_id
    }
  }
`;

export { Insert_Item_Translation_Revision_Change };
