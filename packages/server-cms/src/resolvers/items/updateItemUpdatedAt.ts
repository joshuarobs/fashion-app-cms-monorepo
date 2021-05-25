import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates the item's updated_at field to "now"
 * This should be called after making any changes to an any item's maindata
 * or translation
 */
async function updateItemUpdatedAt(id: number, loggerPrefix = '') {
  logger.info(
    `${loggerPrefix}graphql > updateItemUpdatedAt() | args: id: ${id}`
  );

  try {
    /*
     * ============================================================
     * 1. Update the Item's `updated_at` field
     * ============================================================
     */
    const data1 = await client.mutate({
      mutation: gql`
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
      variables: {
        id,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > updateItemUpdatedAt() :: Successfully returned data`
    );
    return data1.data.update_items_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemUpdatedAt };
