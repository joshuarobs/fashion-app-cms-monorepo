import { gql } from '@apollo/client';

/**
 * Gets the 10 latest-made unique production items for a clothing shell
 * (Barebones data only)
 * This is used for the Item page, when showing the 10 latest-made items in
 * the mini items frame
 */
const Get_Top_X_Unique_Items_For_Clothing_Shell_BB = gql`
  query getTopXUniqueProdItemsForClothingShellBB($id: Int!) {
    item_maindata_revisions(
      where: {
        item_maindata: { clothing_shell_id: { _eq: $id } }
        # state: { _eq: Production }
      }
      order_by: { item_id: desc, revision: desc }
      distinct_on: item_id
      limit: 10
    ) {
      id
      item_maindata(order_by: { is_release: desc }, limit: 1) {
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
