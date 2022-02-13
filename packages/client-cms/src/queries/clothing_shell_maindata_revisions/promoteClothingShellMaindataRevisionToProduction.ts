import { gql } from '@apollo/client';

/**
 * Promotes the Clothing Shell Maindata Revision's state to Production
 * Used in the Clothing Shell page's StateFrame, typically when promoting from
 * Review to Production
 */
const Promote_Clothing_Shell_Maindata_Revision_To_Production = gql`
  mutation promoteClothingShellMaindataRevisionToProduction($id: String!) {
    promoteClothingShellMaindataRevisionToProduction(id: $id) {
      id
      clothing_shell_id
      revision
      state
    }
  }
`;

export { Promote_Clothing_Shell_Maindata_Revision_To_Production };
