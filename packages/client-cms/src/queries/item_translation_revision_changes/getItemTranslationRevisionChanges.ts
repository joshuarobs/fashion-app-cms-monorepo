import { gql } from '@apollo/client';

const Get_Item_Translation_Revision_Changes = gql`
  query getItemTranslationRevisionChanges($itemId: Int!, $limit: Int) {
    getItemTranslationRevisionChanges(itemId: $itemId, limit: $limit) {
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

export { Get_Item_Translation_Revision_Changes };
