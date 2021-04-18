import { gql } from '@apollo/client';

/**
 * Gets the latest production item maindata revision by the item id.
 * This is used for the Settings tab for the Item page (Recalc company number of
 * items upon deleting)
 */
const Get_Latest_Production_Item_Maindata_Revision_By_Item_Id = gql`
  query getLatestProdItemMaindataRevByItemId($itemId: Int!) {
    getLatestProdItemMaindataRevByItemId(itemId: $itemId) {
      id
      # item_id
      # revision
      item_maindata {
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
