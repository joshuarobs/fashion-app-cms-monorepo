import { gql } from '@apollo/client';

const Get_Company_Translation_Revisions = gql`
  query getCompanyTranslationRevisions($id: Int!) {
    company_translation_revisions(
      where: { company_id: { _eq: $id } }
      distinct_on: [locale_code]
      order_by: [{ locale_code: asc }, { revision: desc }]
    ) {
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
      company_translations(order_by: { is_release: desc }, limit: 1) {
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
