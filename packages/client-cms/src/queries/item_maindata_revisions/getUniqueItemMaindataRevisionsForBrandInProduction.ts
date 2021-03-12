import { gql } from '@apollo/client';

const Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only = gql`
  query getUnqItemMdataRevsForBrandProdOnly($id: Int!) {
    item_maindata_revisions_aggregate(
      where: {
        item_maindata: { brand_id: { _eq: $id } }
        state: { _eq: Production }
      }
      distinct_on: item_id
    ) {
      aggregate {
        count
      }
    }
  }
`;

export { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only };
