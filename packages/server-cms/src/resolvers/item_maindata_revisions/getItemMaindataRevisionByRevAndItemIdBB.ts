import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Obtains an Item Maindata Revision, and it's Item Maindata.
 *
 * This is for the item page, where an item's revision is loaded.
 * @param itemId
 * @param revision
 */
async function getItemMaindataRevisionByRevAndItemIdBarebones(
  itemId: number,
  revision: number
) {
  try {
    const data = await client.query({
      query: gql`
        query getItemMaindataRevisionByRevAndItemIdBarebones(
          $itemId: Int!
          $revision: Int!
        ) {
          item_maindata_revisions(
            where: { item_id: { _eq: $itemId }, revision: { _eq: $revision } }
            limit: 1
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        itemId,
        revision,
      },
    });
    return data.data.item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemMaindataRevisionByRevAndItemIdBarebones };
