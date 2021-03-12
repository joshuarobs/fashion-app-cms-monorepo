import { gql } from '@apollo/client';

/**
 * Gets the number of unique production items for a company.
 * This is used for the Item's list page and the Item page, when displaying
 * the number of unique items a company has in production.
 */
const Get_Num_Of_Unique_Items_For_Clothing_Shell = gql`
  query getNumOfUniqueItemsForClothingShell($id: Int!) {
    item_maindata_revisions_aggregate(
      where: {
        item_maindata: { clothing_shell_id: { _eq: $id } }
        # state: { _eq: Production }
      }
      # order_by: { item_id: asc, revision: desc }
      distinct_on: item_id
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { Get_Num_Of_Unique_Items_For_Clothing_Shell };
