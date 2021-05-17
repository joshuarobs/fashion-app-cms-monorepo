import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets the number of unique production items for a company.
 * This is used for the Item's list page and the Item page, when displaying
 * the number of unique items a company has in production.
 */
async function getNumberOfUniqueItemsForClothingShell() {
  try {
    const data = await client.query({
      query: gql`
        query getNumberOfUniqueItemsForClothingShell($id: Int!) {
          item_maindata_revisions_aggregate(
            where: {
              item_maindata: { clothing_shell_id: { _eq: $id } }
              # state: { _eq: Production }
            }
            # order_by: { item_id: asc, revision: desc }
            distinct_on: item_id
          ) {
            aggregate {
              count
            }
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
    return data.data.item_maindata_revisions_aggregate;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getNumberOfUniqueItemsForClothingShell };
