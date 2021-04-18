import { gql } from '@apollo/client';

const Get_Item_Translation_Revision_Changes_Promos_Only = gql`
  query getItemTranslationRevisionChangesPromosOnly(
    $itemId: Int!
    $localeCode: String!
    $revision: Int!
  ) {
    getItemTranslationRevisionChangesPromosOnly(
      itemId: $itemId
      localeCode: $localeCode
      revision: $revision
    ) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
        email
      }
      item_translation_revision_id
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

export { Get_Item_Translation_Revision_Changes_Promos_Only };
