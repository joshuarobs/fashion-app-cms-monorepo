import { gql } from '@apollo/client';

const Insert_Company_Translation_Revision_Change = gql`
  mutation insertCompanyTranslationRevisionChange(
    $revisionId: uuid!
    $changeType: data_change_types_enum!
    $toState: data_states_enum
    $action: data_actions_enum
    $userId: Int!
  ) {
    insert_company_translation_revision_changes_one(
      object: {
        company_translation_revision_id: $revisionId
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
      company_translation_revision_id
      user_id
    }
  }
`;

export { Insert_Company_Translation_Revision_Change };
