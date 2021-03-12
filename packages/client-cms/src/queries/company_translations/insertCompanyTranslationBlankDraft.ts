import { gql } from '@apollo/client';

const Insert_Company_Translation_Blank_Draft = gql`
  mutation insertCompanyTranslationBlankDraft($revisionId: uuid!) {
    insert_company_translations_one(
      object: {
        revision_id: $revisionId
        is_release: false
        stylised_name: ""
        short_name: ""
      }
    ) {
      id
      revision_id
      is_release
      stylised_name
      short_name
      bio
    }
  }
`;

export { Insert_Company_Translation_Blank_Draft };
