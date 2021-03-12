import { gql } from '@apollo/client';

const Delete_Company_Translation_Revision_Changes_For_Revision = gql`
  mutation deleteCompanyTranslationRevisionChangesForRevision($id: uuid!) {
    delete_company_translation_revision_changes(
      where: { company_translation_revision_id: { _eq: $id } }
    ) {
      returning {
        id
        date
        change_type
        action
        to_state
        company_translation_revision_id
        user_id
      }
    }
  }
`;

export { Delete_Company_Translation_Revision_Changes_For_Revision };
