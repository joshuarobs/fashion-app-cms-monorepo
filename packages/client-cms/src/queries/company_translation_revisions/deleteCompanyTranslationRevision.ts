import { gql } from '@apollo/client';

const Delete_Company_Translation_Revision = gql`
  mutation deleteCompanyTranslationRevision($id: uuid!) {
    delete_company_translation_revisions_by_pk(id: $id) {
      id
      company_id
      revision
      state
      locale_code
    }
  }
`;

export { Delete_Company_Translation_Revision };
