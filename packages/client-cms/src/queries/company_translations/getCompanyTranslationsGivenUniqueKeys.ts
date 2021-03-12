import { gql } from '@apollo/client';

const Get_Company_Translations_Given_Unique_Keys = gql`
  query getCompanyTranslationsGivenUniqueKeys(
    $revision: Int!
    $companyId: Int!
    $localeCode: String!
  ) {
    company_translations(
      where: {
        revision: {
          revision: { _eq: $revision }
          company_id: { _eq: $companyId }
          locale_code: { _eq: $localeCode }
        }
      }
      order_by: { is_release: asc }
    ) {
      id
      revision_id
      is_release
      stylised_name
      short_name
      bio
      revision {
        revision
        company_id
        locale_code
      }
    }
  }
`;

export { Get_Company_Translations_Given_Unique_Keys };
