import { gql } from '@apollo/client';

const Get_Clothing_Shell_Maindata_Revision_Changes = gql`
  query getClothingShellMaindataRevisionChanges($id: Int!, $limit: Int!) {
    clothing_shell_maindata_revision_changes(
      where: {
        clothing_shell_maindata_revision: { clothing_shell_id: { _eq: $id } }
      }
      order_by: { date: desc }
      limit: $limit
    ) {
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
