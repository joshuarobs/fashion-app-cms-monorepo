import { gql } from '@apollo/client';

const Get_Clothing_Shell_Maindata_Revision_Changes = gql`
  query getClothingShellMaindataRevisionChanges($id: Int!, $limit: Int!) {
    getClothingShellMaindataRevisionChanges(id: $id, limit: $limit) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
      }
      clothing_shell_maindata_revision {
        id
        clothing_shell_id
        revision
        clothing_shell {
          id
          # name
        }
      }
    }
  }
`;

export { Get_Clothing_Shell_Maindata_Revision_Changes };
