import { gql } from '@apollo/client';

const Get_Item_Translation_Revision_Changes_For_Locale = gql`
  query getItemTranslationRevisionChangesForLocale(
    $itemId: Int!
    $localeCode: String!
  ) {
    getItemTranslationRevisionChangesForLocale(
      itemId: $itemId
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
      item_translation_revision {
        id
        item_id
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
        item {
          id
          # name
        }
      }
    }
  }
`;

export { Get_Item_Translation_Revision_Changes_For_Locale };
