import { gql } from '@apollo/client';

const Get_Company_Translation_Revision_Changes = gql`
  query getCompanyTranslationRevisionChanges($companyId: Int!) {
    getCompanyTranslationRevisionChanges(companyId: $companyId) {
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

export { Get_Company_Translation_Revision_Changes };
