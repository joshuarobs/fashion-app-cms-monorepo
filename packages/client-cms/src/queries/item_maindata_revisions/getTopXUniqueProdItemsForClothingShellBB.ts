import { gql } from '@apollo/client';

/**
 * Gets the 10 latest-made unique production items for a clothing shell
 * (Barebones data only)
 * This is used for the Item page, when showing the 10 latest-made items in
 * the mini items frame
 */
const Get_Top_X_Unique_Items_For_Clothing_Shell_BB = gql`
  query getTopXUniqueProdItemsForClothingShellBB(
    $id: Int!
    $limit: Int
    $offset: Int
  ) {
    getTopXUniqueProdItemsForClothingShellBB(
      id: $id
      limit: $limit
      offset: $offset
    ) {
      id
      item_maindata {
        id
        name
        short_id
        is_release
      }
      item_id
      revision
      state
    }
  }
`;

export { Get_Top_X_Unique_Items_For_Clothing_Shell_BB };
