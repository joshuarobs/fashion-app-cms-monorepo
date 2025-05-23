import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { ItemType } from '@joshuarobs/clothing-framework';

/**
 * Gets all the revisions for an item (main data only)
 * Barebones (BB) data only (no other relational or foreign data)
 * This is used for the Overview tab for the Item page (Revisions dropdown)
 * @param revision_id
 * @param is_release
 * @param context - Apollo context
 */
async function insertItemGlobalMediaBarebones(
  revision_id: string,
  is_release: boolean,
  context?: any
) {
  logger.info(
    `graphql > insertItemGlobalMediaBarebones() :: args: revision_id: ${revision_id} | is_release: ${is_release} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertItemGlobalMediaBarebones(
          $revision_id: uuid!
          $is_release: Boolean!
        ) {
          insert_item_global_media_one(
            object: {
              revision_id: $revision_id
              is_release: $is_release
              notes: ""
            }
          ) {
            id
            is_release
            revision_id
          }
        }
      `,
      variables: {
        revision_id,
        is_release,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > insertItemGlobalMediaBarebones() :: Successfully returned data`
    );
    return data.data.insert_item_global_media_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemGlobalMediaBarebones };
