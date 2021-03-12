import { gql } from '@apollo/client';

const Delete_Item_Translation_Revisions_For_Item = gql`
  mutation deleteItemTranslationRevisionsForItem($id: Int!) {
    delete_item_translation_revisions(where: { item_id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export { Delete_Item_Translation_Revisions_For_Item };
