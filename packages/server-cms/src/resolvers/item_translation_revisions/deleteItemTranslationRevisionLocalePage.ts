import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';
import { deleteItemTranslationRevisionChangesForRevision } from '../item_translation_revision_changes/deleteItemTranslationRevisionChangeForRevision';
import { updateItemUpdatedAt } from '../items/updateItemUpdatedAt';
import { Logger_Prefix_Sub_Level_1 } from '../../settings';

/**
 * Deletes an Item Translation Revision and all of its dependents.
 * This is called on an Item's Localisation page, within a Locale (e.g.
 * `en-US`) that is bugged and has no `item_translations` (i.e. Draft and/or
 * Release translations)
 * @param id - The `id` of the `item_translation_revisions` row
 */
async function deleteItemTranslationRevisionLocalePage(id: string) {
  logger.info(
    `graphql > deleteItemTranslationRevisionLocalePage() :: args: id: ${id}`
  );
  const userId = 1;
  // id = '15125a29-6745-4468-92fa-5106ea419fc0';

  try {
    /*
     * ============================================================
     * 1. Query the Item translation revisions and see if it exists
     * ============================================================
     */
    const data1 = await client.query({
      query: gql`
        query getItemTranslationRevisionBBForDeletion($id: uuid!) {
          item_translation_revisions_by_pk(id: $id) {
            id
            item_id
            revision
            state
          }
        }
      `,
      variables: {
        id,
      },
      fetchPolicy: 'network-only',
    });

    console.log('data1:', data1.data.item_translation_revisions_by_pk);
    const matchingTranslationRevision =
      data1.data.item_translation_revisions_by_pk;

    // Return early if we didn't find anything with this id
    if (!matchingTranslationRevision) {
      logger.info(
        `graphql > deleteItemTranslationRevisionLocalePage() :: (1.a) Returned early because we didn't find an existing item_translation_revision with given id (id arg: "${id}")`
      );
      return null;
    }

    // return null;

    /*
     * ============================================================
     * 2. Delete all changes (i.e. the activity log) for the
     * revision
     * ============================================================
     */
    const data2 = await deleteItemTranslationRevisionChangesForRevision(
      id,
      Logger_Prefix_Sub_Level_1
    );

    /*
     * ============================================================
     * 3. Delete the item translation revision itself
     * ============================================================
     */
    const data3 = await client.mutate({
      mutation: gql`
        mutation deleteItemTranslationRevisionLocalePage($id: uuid!) {
          delete_item_translation_revisions_by_pk(id: $id) {
            id
            item_id
            revision
            state
            locale_code
          }
        }
      `,
      variables: {
        id,
      },
    });

    /*
     * ============================================================
     * 4. Update the related Item's `updated_at`
     * ============================================================
     */
    const { item_id } = matchingTranslationRevision;
    const data6 = await updateItemUpdatedAt(item_id, Logger_Prefix_Sub_Level_1);

    // TODO: Insert an activity change (meta, for the item) that indicates
    //  that a revision has been deleted?

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `graphql > deleteItemTranslationRevisionLocalePage() :: Successfully returned data`
    );
    return data3.data.delete_item_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevisionLocalePage };
