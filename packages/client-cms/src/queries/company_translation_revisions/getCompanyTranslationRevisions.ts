import { gql } from '@apollo/client';

const Get_Company_Translation_Revisions = gql`
  query getCompanyTranslationRevisions($id: Int!) {
    getCompanyTranslationRevisions(id: $id) {
      id
      company_id
      locale_code
      revision
      state
      locale {
        code
        name
        country {
          value
        }
        language {
          value
        }
      }
      company_translations {
        id
        revision_id
        is_release
        stylised_name
        short_name
        bio
      }
    }
  }
`;

export { Get_Company_Translation_Revisions };
