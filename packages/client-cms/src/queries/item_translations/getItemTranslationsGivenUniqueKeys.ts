import { gql } from '@apollo/client';

const Get_Item_Translations_Given_Unique_Keys = gql`
  query getItemTranslationsGivenUniqueKeys(
    $revision: Int!
    $itemId: Int!
    $localeCode: String!
  ) {
    item_translations(
      where: {
        revision: {
          revision: { _eq: $revision }
          item_id: { _eq: $itemId }
          locale_code: { _eq: $localeCode }
        }
      }
      order_by: { is_release: asc }
    ) {
      id
      revision_id
      is_release
      full_name
      short_name
      description
      revision {
        revision
        item_id
        locale_code
      }
    }
  }
`;

export { Get_Item_Translations_Given_Unique_Keys };
