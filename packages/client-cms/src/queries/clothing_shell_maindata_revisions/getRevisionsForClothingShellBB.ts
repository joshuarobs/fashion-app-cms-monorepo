import { gql } from '@apollo/client';

/**
 * Gets all the revisions for a clothing shell (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Clothing Shell page (Revisions
 * dropdown)
 */
const Get_Revisions_For_Clothing_Shell_BB = gql`
  query getRevisionsForClothingShellBarebones($id: Int!) {
    getRevisionsForClothingShellBarebones(id: $id) {
      id
      revision
      state
    }
  }
`;

export { Get_Revisions_For_Clothing_Shell_BB };
