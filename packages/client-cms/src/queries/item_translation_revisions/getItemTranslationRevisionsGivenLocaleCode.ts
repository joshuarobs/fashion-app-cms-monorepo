import { gql } from '@apollo/client';

const Get_Item_Translation_Revisions_Given_Locale_Code = gql`
  query getItemTranslationRevisionsGivenLocaleCode(
    $itemId: Int!
    $localeCode: String!
  ) {
    getItemTranslationRevisionsGivenLocaleCode(
      itemId: $itemId
      localeCode: $localeCode
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
      item_translations {
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
