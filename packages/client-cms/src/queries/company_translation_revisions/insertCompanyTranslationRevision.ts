import { gql } from '@apollo/client';

const Insert_Company_Translation_Revision = gql`
  mutation insertCompanyTranslationRevision(
    $entryId: Int!
    $localeCode: String!
    $revision: Int!
  ) {
    insert_company_translation_revisions_one(
      object: {
        company_id: $entryId
        locale_code: $localeCode
        revision: $revision
      }
    ) {
      id
      company_id
      locale_code
      revision
      state
    }
  }
`;

export { Insert_Company_Translation_Revision };
