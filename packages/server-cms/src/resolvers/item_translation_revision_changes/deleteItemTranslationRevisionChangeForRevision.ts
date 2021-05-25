import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Deletes all Item Translation Revision Changes given a Revision's id
 * @param id - The id of the Item Translation Revision
 * @param loggerPrefix
 */
async function deleteItemTranslationRevisionChangesForRevision(
  id: string,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > deleteItemTranslationRevisionChangesForRevision() | args: id: ${id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemTranslationRevisionChangesForRevision($id: uuid!) {
          delete_item_translation_revision_changes(
            where: { item_translation_revision_id: { _eq: $id } }
          ) {
            returning {
              id
              date
              change_type
              action
              to_state
              item_translation_revision_id
              user_id
            }
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
      `${loggerPrefix}graphql > deleteItemTranslationRevisionChangesForRevision() :: Successfully returned data`
    );
    return data.data.delete_item_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevisionChangesForRevision };
