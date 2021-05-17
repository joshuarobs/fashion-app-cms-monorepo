import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets relevant basic information about items
 * Obtains all items's that are in production
 * This is used for going on the Items (list) page
 */
async function getItemsForItemsTableProductionOnly() {
  try {
    const data = await client.query({
      query: gql`
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
      `,
      fetchPolicy: 'network-only',
    });
    return data.data.items;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemsForItemsTableProductionOnly };
