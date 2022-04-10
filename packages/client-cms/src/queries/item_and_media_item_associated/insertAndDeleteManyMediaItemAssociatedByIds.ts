import { gql } from '@apollo/client';

const Insert_And_Delete_Many_Media_Item_Associated_By_Ids = gql`
  mutation insertAndDeleteManyMediaItemAssociatedByIds(
    $item_id: Int!
    $media_item_ids: [String!]!
  ) {
    insertAndDeleteManyMediaItemAssociatedByIds(
      item_id: $item_id
      media_item_ids: $media_item_ids
    ) {
      item_id
      media_item_id
      media_item {
        id
        name
        url
      }
    }
  }
`;

export { Insert_And_Delete_Many_Media_Item_Associated_By_Ids };
