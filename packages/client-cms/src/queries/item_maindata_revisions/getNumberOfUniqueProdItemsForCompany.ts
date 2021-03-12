import { gql } from '@apollo/client';

/**
 * Gets the number of unique production items for a company.
 * This is used for the Item's list page and the Item page, when displaying
 * the number of unique items a company has in production.
 */
const Get_Num_Of_Unique_Prod_Items_For_Company = gql`
  query getNumOfUniqueProdItemsForCompany($id: Int!) {
    item_maindata_revisions_aggregate(
      where: {
        item_maindata: { brand_id: { _eq: $id } }
        state: { _eq: Production }
      }
      order_by: { item_id: asc, revision: desc }
      distinct_on: item_id
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { Get_Num_Of_Unique_Prod_Items_For_Company };
