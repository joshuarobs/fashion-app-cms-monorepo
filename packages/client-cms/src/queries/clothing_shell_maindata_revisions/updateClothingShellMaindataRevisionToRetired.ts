import { gql } from '@apollo/client';

const Update_Clothing_Shell_Maindata_Revision_To_Retired = gql`
  mutation updateClothingShellMaindataRevisionToRetired($revisionId: uuid!) {
    update_clothing_shell_maindata_revisions_by_pk(
      pk_columns: { id: $revisionId }
      _set: { state: Retired }
    ) {
      id
      clothing_shell_id
      revision
      state
    }
  }
`;

export { Update_Clothing_Shell_Maindata_Revision_To_Retired };
