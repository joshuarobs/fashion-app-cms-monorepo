import { gql } from '@apollo/client';

const Get_Item_Translation_Revision_Changes = gql`
  query getItemTranslationRevisionChanges($itemId: Int!, $limit: Int!) {
    item_translation_revision_changes(
      where: { item_translation_revision: { item_id: { _eq: $itemId } } }
      order_by: { date: desc }
      limit: $limit
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

export { Get_Item_Translation_Revision_Changes };
