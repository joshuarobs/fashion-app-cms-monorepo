import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationRevisionChangesForRevision() {
  try {
    const data = await client.query({
      query: gql`
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
    });
    return data.data.delete_item_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevisionChangesForRevision };
