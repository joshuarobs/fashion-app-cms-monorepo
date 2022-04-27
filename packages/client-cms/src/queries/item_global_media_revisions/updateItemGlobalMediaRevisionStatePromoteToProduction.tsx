import { gql } from '@apollo/client';

const Update_Item_Global_Media_Revision_State_Promote_To_Production = gql`
  mutation updateItemGlobalMaindataRevisionStatePromoteToProduction(
    $id: String!
  ) {
    updateItemGlobalMaindataRevisionStatePromoteToProduction(id: $id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Update_Item_Global_Media_Revision_State_Promote_To_Production };
