import { gql } from '@apollo/client';

const Get_Item_Maindata_Revision_By_Rev_And_Item_Id_BB = gql`
  query getItemMaindataRevisionByRevAndItemIdBarebones(
    $itemId: Int!
    $revision: Int!
  ) {
    getItemMaindataRevisionByRevAndItemIdBarebones(
      itemId: $itemId
      revision: $revision
    ) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Get_Item_Maindata_Revision_By_Rev_And_Item_Id_BB };
