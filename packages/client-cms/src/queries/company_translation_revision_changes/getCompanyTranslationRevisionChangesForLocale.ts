import { gql } from '@apollo/client';

const Get_Company_Translation_Revision_Changes_For_Locale = gql`
  query getCompanyTranslationRevisionChangesForLocale(
    $companyId: Int!
    $localeCode: String!
  ) {
    company_translation_revision_changes(
      where: {
        company_translation_revision: {
          company_id: { _eq: $companyId }
          locale_code: { _eq: $localeCode }
        }
      }
      order_by: { date: desc }
      limit: 10
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
