import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets the unique production items for a company
 * This is used as part of updating the client's cache of maindata revisions
 * prior to setting the number of unique items count for a company.
 * (If this isn't called, an item will only add to the company's unique item
 * count on revision 2 production, instead of on revision 1)
 * NOTE: This seems useless since I managed to figure out how to fix the bug
 * without calling this method
 */
async function getUniqueProdItemsForCompany() {
  try {
    const data = await client.query({
      query: gql`
        query getUniqueProdItemsForCompany($id: Int!) {
          item_maindata_revisions(
            where: {
              item_maindata: { brand_id: { _eq: $id } }
              state: { _eq: Production }
            }
            order_by: { item_id: asc, revision: desc }
            distinct_on: item_id
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
    return data.data.item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getUniqueProdItemsForCompany };
