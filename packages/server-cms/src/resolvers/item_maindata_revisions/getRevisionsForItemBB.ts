import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Gets all the revisions for an item (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Item page (Revisions dropdown)
 */
async function getRevisionsForItemBarebones() {
  try {
    const data = await client.query({
      query: gql`
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
      `,
    });
    return data.data.item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getRevisionsForItemBarebones };
