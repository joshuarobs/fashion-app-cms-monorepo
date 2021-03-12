import { gql } from '@apollo/client';

/**
 * Updates the Clothing Shell Maindata Revision's state
 * Used in the Clothing Shell page's StateFrame, typically when promoting to
 * a newer state
 */
const Update_Clothing_Shell_Maindata_Revision_State = gql`
  mutation updateClothingShellMaindataRevisionState(
    $revisionId: uuid!
    $state: data_states_enum!
  ) {
    update_clothing_shell_maindata_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: $state }
    ) {
      id
      clothing_shell_id
      revision
      state
    }
  }
`;

export { Update_Clothing_Shell_Maindata_Revision_State };
