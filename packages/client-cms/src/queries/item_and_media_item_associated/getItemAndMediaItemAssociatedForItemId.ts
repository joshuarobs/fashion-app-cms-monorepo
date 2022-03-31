import { gql } from '@apollo/client';

const Get_Item_And_Media_Item_Associated_For_Item_Id = gql`
  query getItemAndMediaItemAssociatedForItemId(
    $id: Int!
    $limit: Int
    $offset: Int
  ) {
    getItemAndMediaItemAssociatedForItemId(
      id: $id
      limit: $limit
      offset: $offset
    ) {
      item_id
      media_item_id
    }
  }
`;

export { Get_Item_And_Media_Item_Associated_For_Item_Id };
