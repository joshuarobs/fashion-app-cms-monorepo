import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates the item's updated_at field to "now"
 * This should be called after making any changes to an any item's maindata
 * or translation
 */
async function updateItemUpdatedAt() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemUpdatedAt($id: Int!) {
          update_items_by_pk(
            pk_columns: { id: $id }
            _set: { updated_at: "now()" }
          ) {
            updated_at
            id
          }
        }
      `,
    });
    return data.data.update_items_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemUpdatedAt };
