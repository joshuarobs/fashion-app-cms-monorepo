import { gql } from '@apollo/client';

const Get_Item_Translation_Revisions_Given_Locale_Code = gql`
  query getItemTranslationRevisionsGivenLocaleCode(
    $itemId: Int!
    $localeCode: String!
  ) {
    item_translation_revisions(
      where: { item_id: { _eq: $itemId }, locale_code: { _eq: $localeCode } }
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
      item_translations(order_by: { is_release: desc }, limit: 1) {
        revision_id
        is_release
        full_name
        short_name
        description
      }
    }
  }
`;

export { Get_Item_Translation_Revisions_Given_Locale_Code };
