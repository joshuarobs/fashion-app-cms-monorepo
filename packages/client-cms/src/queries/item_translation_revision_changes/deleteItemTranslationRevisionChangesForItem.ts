import { gql } from '@apollo/client';

const Delete_Item_Translation_Revision_Changes_For_Item = gql`
  mutation deleteItemTranslationRevisionChangesForItem($id: Int!) {
    delete_item_translation_revision_changes(
      where: { item_translation_revision: { item_id: { _eq: $id } } }
    ) {
      returning {
        id
      }
    }
  }
`;

export { Delete_Item_Translation_Revision_Changes_For_Item };
