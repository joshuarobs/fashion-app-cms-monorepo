import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates the Item Maindata Revision's state
 * Used in the Item page's StateFrame, typically when promoting to a newer state
 */
async function updateItemMaindataRevisionState() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemMaindataRevisionState(
          $revisionId: uuid!
          $state: data_states_enum!
        ) {
          update_item_maindata_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: $state }
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

export { updateItemMaindataRevisionState };
