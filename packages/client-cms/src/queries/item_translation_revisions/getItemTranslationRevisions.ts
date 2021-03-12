import { gql } from '@apollo/client';

const Get_Item_Translation_Revisions = gql`
  query getItemTranslationRevisions($id: Int!) {
    item_translation_revisions(
      where: { item_id: { _eq: $id } }
      distinct_on: [locale_code]
      order_by: [{ locale_code: asc }, { revision: desc }]
    ) {
      id
      item_id
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
      item_translations(order_by: { is_release: desc }, limit: 1) {
        id
        revision_id
        is_release
        full_name
        short_name
        description
      }
    }
  }
`;

export { Get_Item_Translation_Revisions };
