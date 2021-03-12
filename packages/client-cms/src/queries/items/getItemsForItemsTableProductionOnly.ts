import { gql } from '@apollo/client';

/**
 * Gets relevant basic information about items
 * Obtains all items's that are in production
 * This is used for going on the Items (list) page
 */
const Get_Items_For_Items_Table_Production_Only = gql`
  query getItemsForItemsTableProductionOnly {
    items(
      order_by: { updated_at: desc }
      where: { item_maindata_revisions: { state: { _eq: Production } } }
    ) {
      id
      short_id
      item_maindata_revisions(
        order_by: { revision: desc }
        limit: 1
        where: { state: { _eq: Production } }
      ) {
        id
        revision
        state
        item_maindata(order_by: { is_release: asc }, limit: 1) {
          id
          name
        }
      }
    }
  }
`;

export { Get_Items_For_Items_Table_Production_Only };
