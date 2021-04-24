import { gql } from '@apollo/client';

const Get_Item_Translation_Revision_Changes = gql`
  query getItemTranslationRevisionChanges($id: Int!, $limit: Int) {
    getItemTranslationRevisionChanges(id: $id, limit: $limit) {
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
