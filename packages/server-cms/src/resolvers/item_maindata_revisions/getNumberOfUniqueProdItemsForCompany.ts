import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets the number of unique production items for a company.
 * This is used for the Item's list page and the Item page, when displaying
 * the number of unique items a company has in production.
 */
async function getNumberOfUniqueProdItemsForCompany() {
  try {
    const data = await client.query({
      query: gql`
        query getNumberOfUniqueProdItemsForCompany($id: Int!) {
          item_maindata_revisions_aggregate(
            where: {
              item_maindata: { brand_id: { _eq: $id } }
              state: { _eq: Production }
            }
            order_by: { item_id: asc, revision: desc }
            distinct_on: item_id
          ) {
            aggregate {
              count
            }
          }
        }
      `,
    });
    return data.data.item_maindata_revisions_aggregate;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getNumberOfUniqueProdItemsForCompany };
