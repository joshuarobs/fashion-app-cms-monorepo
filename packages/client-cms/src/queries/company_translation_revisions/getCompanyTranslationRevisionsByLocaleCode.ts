import { gql } from '@apollo/client';

const Get_Company_Translation_Revisions_By_Locale_Code = gql`
  query getCompanyTranslationRevisionsByLocaleCode(
    $companyId: Int!
    $localeCode: String!
  ) {
    getCompanyTranslationRevisionsByLocaleCode(
      companyId: $companyId
      localeCode: $localeCode
    ) {
      id
      locale_code
      revision
      state
      locale {
        code
        name
        country {
          value
          description
        }
        language {
          value
          description
        }
      }
      company_translations {
        revision_id
        is_release
        stylised_name
        short_name
        bio
      }
    }
  }
`;

export { Get_Company_Translation_Revisions_By_Locale_Code };
