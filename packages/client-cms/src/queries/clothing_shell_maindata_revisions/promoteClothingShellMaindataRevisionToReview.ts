import { gql } from '@apollo/client';

/**
 * Promotes the Clothing Shell Maindata Revision's state to Review
 * Used in the Clothing Shell page's StateFrame, typically when promoting from
 * Development to Review
 */
const Promote_Clothing_Shell_Maindata_Revision_To_Review = gql`
  mutation promoteClothingShellMaindataRevisionToReview($id: String!) {
    promoteClothingShellMaindataRevisionToReview(id: $id) {
      id
      clothing_shell_id
      revision
      state
    }
  }
`;

export { Promote_Clothing_Shell_Maindata_Revision_To_Review };
