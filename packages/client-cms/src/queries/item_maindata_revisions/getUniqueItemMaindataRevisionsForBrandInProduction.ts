import { gql } from '@apollo/client';

const Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only = gql`
  query getUniqueItemMaindataRevsForBrandProdOnly($id: Int!) {
    getUniqueItemMaindataRevsForBrandProdOnly(id: $id) {
      aggregate {
        count
      }
    }
  }
`;

export { Get_Unique_Item_Maindata_Rev_Amount_For_Brand_Prod_Only };
