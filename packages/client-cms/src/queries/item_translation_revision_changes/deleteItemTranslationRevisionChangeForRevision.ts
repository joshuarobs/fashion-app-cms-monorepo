import { gql } from '@apollo/client';

const Delete_Item_Translation_Revision_Changes_For_Revision = gql`
  mutation deleteItemTranslationRevisionChangesForRevision($id: uuid!) {
    delete_item_translation_revision_changes(
      where: { item_translation_revision_id: { _eq: $id } }
    ) {
      returning {
        id
        date
        change_type
        action
        to_state
        item_translation_revision_id
        user_id
      }
    }
  }
`;

export { Delete_Item_Translation_Revision_Changes_For_Revision };
