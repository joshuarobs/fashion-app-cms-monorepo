import { gql } from '@apollo/client';

const Insert_Clothing_Shell_Maindata_Revision = gql`
  mutation insertClothingShellMaindataRevision(
    $id: Int!
    $revision: Int!
    $state: data_states_enum
  ) {
    insert_clothing_shell_maindata_revisions_one(
      object: { clothing_shell_id: $id, revision: $revision, state: $state }
    ) {
      id
      clothing_shell_id
      revision
      state
    }
  }
`;

export { Insert_Clothing_Shell_Maindata_Revision };
