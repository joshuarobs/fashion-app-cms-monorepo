import { gql } from '@apollo/client';

const Get_Item_Translations_Given_Unique_Keys = gql`
  query getItemTranslationsGivenUniqueKeys(
    $revision: Int!
    $itemId: Int!
    $localeCode: String!
  ) {
    getItemTranslationsGivenUniqueKeys(
      revision: $revision
      itemId: $itemId
      localeCode: $localeCode
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
