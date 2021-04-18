import { gql } from '@apollo/client';

const Get_Company_Translation_Revision_Changes_Promos_Only = gql`
  query getCompanyTranslationRevisionChangesPromosOnly(
    $companyId: Int!
    $localeCode: String!
    $revision: Int!
  ) {
    getCompanyTranslationRevisionChangesPromosOnly(
      companyId: $companyId
      localeCode: $localeCode
      revision: $revision
    ) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
        email
      }
      company_translation_revision_id
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

export { Get_Company_Translation_Revision_Changes_Promos_Only };
