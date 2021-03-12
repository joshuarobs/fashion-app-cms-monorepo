import { gql } from '@apollo/client';

/**
 * Gets the latest production item maindata revision by the item id.
 * This is used for the Settings tab for the Item page (Recalc company number of
 * items upon deleting)
 */
const Get_Latest_Production_Item_Maindata_Revision_By_Item_Id = gql`
  query getLatestProdItemMaindataRevByItemId($itemId: Int!) {
    item_maindata_revisions(
      where: { state: { _eq: Production }, item_id: { _eq: $itemId } }
      order_by: { item_id: asc, revision: desc }
      distinct_on: item_id
    ) {
      id
      # item_id
      # revision
      item_maindata(order_by: { is_release: desc }, limit: 1) {
        id
        name
        brand_id
        brand {
          id
          # name
          counts {
            id
          }
        }
      }
    }
  }
`;

export { Get_Latest_Production_Item_Maindata_Revision_By_Item_Id };
