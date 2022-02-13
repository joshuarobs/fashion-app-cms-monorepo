import { gql } from '@apollo/client';

/**
 * Demotes the Clothing Shell Maindata Revision's state to Development
 * Used in the Clothing Shell page's StateFrame, typically when demoting from
 * Review to Development
 */
const Demote_Clothing_Shell_Maindata_Revision_To_Development = gql`
  mutation demoteClothingShellMaindataRevisionToDevelopment($id: String!) {
    demoteClothingShellMaindataRevisionToDevelopment(id: $id) {
      id
      clothing_shell_id
      revision
      state
    }
  }
`;

export { Demote_Clothing_Shell_Maindata_Revision_To_Development };
