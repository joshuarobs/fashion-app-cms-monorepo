import { gql } from '@apollo/client';

const Get_Item_Translation_Revision_Changes_For_Locale = gql`
  query getItemTranslationRevisionChangesForLocale(
    $itemId: Int!
    $localeCode: String!
  ) {
    item_translation_revision_changes(
      where: {
        item_translation_revision: {
          item_id: { _eq: $itemId }
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
