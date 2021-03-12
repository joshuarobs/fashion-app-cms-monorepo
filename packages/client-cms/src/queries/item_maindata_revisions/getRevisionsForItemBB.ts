import { gql } from '@apollo/client';

/**
 * Gets all the revisions for an item (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Item page (Revisions dropdown)
 */
const Get_Revisions_For_Item_BB = gql`
  query getRevisionsForItemBarebones($id: Int!) {
    item_maindata_revisions(
      where: { item_id: { _eq: $id } }
      order_by: { revision: desc }
    ) {
      id
      revision
      state
      #item_maindata_aggregate {
      #  aggregate {
      #    count
      #  }
      #}
    }
  }
`;

export { Get_Revisions_For_Item_BB };
