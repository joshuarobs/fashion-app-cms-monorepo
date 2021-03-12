import { gql } from '@apollo/client';

const Delete_Item_Translations_For_Items = gql`
  mutation deleteItemTranslationsForItem($id: Int!) {
    delete_item_translations(where: { revision: { item_id: { _eq: $id } } }) {
      returning {
        id
      }
    }
  }
`;

export { Delete_Item_Translations_For_Items };
