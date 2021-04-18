import { gql } from '@apollo/client';

/**
 * Gets the 10 latest-made unique production items for a company
 * (Barebones data only)
 * This is used for the Item page, when showing the 10 latest-made items in
 * the mini items frame
 */
const Get_Top_X_Unique_Prod_Items_For_Company_BB = gql`
  query getTopXUniqueProdItemsForCompanyBB($id: Int!) {
    getTopXUniqueProdItemsForCompanyBB(id: $id) {
      id
      item_maindata {
        id
        name
        short_id
      }
      item_id
      revision
      state
    }
  }
`;

export { Get_Top_X_Unique_Prod_Items_For_Company_BB };
