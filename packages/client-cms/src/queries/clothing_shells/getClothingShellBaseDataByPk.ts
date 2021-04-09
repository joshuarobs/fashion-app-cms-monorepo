import { gql } from '@apollo/client';

/**
 * Gets the clothing shell's base data (by pk), i.e. no other data from other
 * tables (except for aggregates).
 * This is used for going on the Clothing Shell page, for data required by the
 * Header, overview and settings tab
 */
const Get_Clothing_Shell_Base_Data_By_Pk = gql`
  query getClothingShellBaseDataByPk($id: Int!) {
    getClothingShellBaseDataByPk(id: $id) {
      id
      created_at
      updated_at
      counts {
        id
        item_count
      }
      clothing_shell_maindata_revisions {
        id
        revision
        state
        clothing_shell_maindata {
          id
          name
        }
      }
    }
  }
`;

export { Get_Clothing_Shell_Base_Data_By_Pk };
