import { gql } from '@apollo/client';

/**
 * Gets the clothing shell's base data (by pk), i.e. no other data from other
 * tables (except for aggregates).
 * This is used for going on the Clothing Shell page, for data required by the
 * Header, overview and settings tab
 */
const Get_Clothing_Shell_Base_Data_By_Pk = gql`
  query getClothingShellBaseDataByPk($id: Int!) {
    clothing_shells_by_pk(id: $id) {
      id
      created_at
      updated_at
      counts {
        id
        item_count
      }
      clothing_shell_maindata_revisions(
        order_by: { revision: desc }
        limit: 1
      ) {
        id
        revision
        state
        clothing_shell_maindata(limit: 1, order_by: { is_release: desc }) {
          id
          name
        }
      }
    }
  }
`;

export { Get_Clothing_Shell_Base_Data_By_Pk };
