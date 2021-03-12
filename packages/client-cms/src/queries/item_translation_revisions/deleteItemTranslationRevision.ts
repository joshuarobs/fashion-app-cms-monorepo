import { gql } from '@apollo/client';

const Delete_Item_Translation_Revision = gql`
  mutation deleteItemTranslationRevision($id: uuid!) {
    delete_item_translation_revisions_by_pk(id: $id) {
      id
      item_id
      revision
      state
      locale_code
    }
  }
`;

export { Delete_Item_Translation_Revision };
