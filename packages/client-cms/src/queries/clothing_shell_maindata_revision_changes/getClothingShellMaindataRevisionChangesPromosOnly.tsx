import { gql } from '@apollo/client';

const Get_Clothing_Shell_Maindata_Revision_Changes_Promos_Only = gql`
  query getClothingShellMaindataRevisionChangesPromosOnly(
    $clothingShellId: Int!
    $revision: Int!
  ) {
    clothing_shell_maindata_revision_changes(
      where: {
        clothing_shell_maindata_revision: {
          clothing_shell_id: { _eq: $clothingShellId }
          revision: { _eq: $revision }
        }
        change_type: { _eq: Promotion }
      }
      distinct_on: to_state
      order_by: { to_state: asc, date: desc }
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
