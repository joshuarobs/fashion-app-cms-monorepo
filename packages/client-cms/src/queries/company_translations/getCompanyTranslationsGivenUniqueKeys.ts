import { gql } from '@apollo/client';

const Get_Company_Translations_Given_Unique_Keys = gql`
  query getCompanyTranslationsGivenUniqueKeys(
    $revision: Int!
    $companyId: Int!
    $localeCode: String!
  ) {
    getCompanyTranslationsGivenUniqueKeys(
      revision: $revision
      companyId: $companyId
      localeCode: $localeCode
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
