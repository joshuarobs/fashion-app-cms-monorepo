import { gql } from '@apollo/client';

/**
 * Updates the Item Maindata Revision's state by promoting it:
 * Development --> Review
 *
 * Used in the Item page's StateFrame, when the current state is Development
 */
const Update_Item_Maindata_Revision_State_Promote_To_Review = gql`
  mutation updateItemMaindataRevisionStatePromoteToReview($id: String!) {
    updateItemMaindataRevisionStatePromoteToReview(id: $id) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Update_Item_Maindata_Revision_State_Promote_To_Review };
