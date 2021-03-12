import { gql } from '@apollo/client';

const Update_Company_Translation_Revision_To_Retired = gql`
  mutation updateCompanyTranslationRevisionToRetired($revisionId: uuid!) {
    update_company_translation_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: Retired }
    ) {
      id
      company_id
      locale_code
      revision
      state
    }
  }
`;

export { Update_Company_Translation_Revision_To_Retired };
