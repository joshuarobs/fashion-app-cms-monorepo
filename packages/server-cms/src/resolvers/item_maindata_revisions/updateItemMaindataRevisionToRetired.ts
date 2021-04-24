import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates the Item Maindata Revision's state
 * Used in the Item page's StateFrame, typically when promoting to a newer state
 */
async function updateItemMaindataRevisionToRetired() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemMaindataRevisionToRetired($revisionId: uuid!) {
          update_item_maindata_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: Retired }
          ) {
            id
            item_id
            revision
            state
          }
        }
      `,
    });
    return data.data.update_item_maindata_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindataRevisionToRetired };
