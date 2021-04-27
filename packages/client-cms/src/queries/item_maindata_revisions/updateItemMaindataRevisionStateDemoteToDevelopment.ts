import { gql } from '@apollo/client';

/**
 * Updates the Item Maindata Revision's state by promoting it:
 * Development --> Review
 *
 * Used in the Item page's StateFrame, when the current state is Development
 */
const Update_Item_Maindata_Revision_State_Demote_To_Development = gql`
  mutation updateItemMaindataRevisionStateDemoteToDevelopment(
    $id: String!
    $userId: Int
  ) {
    updateItemMaindataRevisionStateDemoteToDevelopment(
      id: $id
      userId: $userId
    ) {
      id
      item_id
      revision
      state
    }
  }
`;

export { Update_Item_Maindata_Revision_State_Demote_To_Development };
