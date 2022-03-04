import { gql } from '@apollo/client';

/**
 * Updates the Item Maindata Revision's state by promoting it:
 * Review --> Production
 *
 * Used in the Item page's StateFrame, when the current state is Review
 */
const Update_Item_Maindata_Revision_State_Promote_To_Production = gql`
  mutation updateItemMaindataRevisionStatePromoteToProduction($id: String!) {
    updateItemMaindataRevisionStatePromoteToProduction(id: $id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Update_Item_Maindata_Revision_State_Promote_To_Production };
