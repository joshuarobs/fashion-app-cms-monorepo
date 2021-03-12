import { gql } from '@apollo/client';

const Get_Company_Translation_Revisions_By_Locale_Code = gql`
  query getCompanyTranslationRevisionsByLocaleCode(
    $companyId: Int!
    $localeCode: String!
  ) {
    company_translation_revisions(
      where: {
        company_id: { _eq: $companyId }
        locale_code: { _eq: $localeCode }
      }
      order_by: { revision: desc }
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
      company_translations(order_by: { is_release: desc }, limit: 1) {
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
