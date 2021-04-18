import { gql } from '@apollo/client';

const Get_Clothing_Shell_Maindata_Revision_Changes_Promos_Only = gql`
  query getClothingShellMaindataRevisionChangesPromosOnly(
    $clothingShellId: Int!
    $revision: Int!
  ) {
    getClothingShellMaindataRevisionChangesPromosOnly(
      clothingShellId: $clothingShellId
      revision: $revision
    ) {
      id
      to_state
      date
      change_type
      action
      user {
        id
        name
        email
      }
      clothing_shell_maindata_revision_id
      clothing_shell_maindata_revision {
        id
        clothing_shell_id
        revision
        #item {
        #  id
        # name
        #}
      }
    }
  }
`;

export { Get_Clothing_Shell_Maindata_Revision_Changes_Promos_Only };
