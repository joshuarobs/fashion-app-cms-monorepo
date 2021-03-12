import { gql } from '@apollo/client';

const Insert_Company_Translation_Revision_Change_Action_Update = gql`
  mutation insertCompanyTranslationRevisionChangeActUpdate(
    $revisionId: uuid!
    $userId: Int!
  ) {
    insert_company_translation_revision_changes_one(
      object: {
        company_translation_revision_id: $revisionId
        change_type: Action
        action: Update
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

export { Insert_Company_Translation_Revision_Change_Action_Update };
