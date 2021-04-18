import { gql } from '@apollo/client';

const Get_Company_Translation_Revision_Changes_For_Locale = gql`
  query getCompanyTranslationRevisionChangesForLocale(
    $companyId: Int!
    $localeCode: String!
  ) {
    getCompanyTranslationRevisionChangesForLocale(
      companyId: $companyId
      localeCode: $localeCode
    ) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
      }
      company_translation_revision {
        id
        company_id
        revision
        locale {
          code
          name
          country {
            description
          }
          language {
            description
          }
        }
        company {
          id
          name
        }
      }
    }
  }
`;

export { Get_Company_Translation_Revision_Changes_For_Locale };
