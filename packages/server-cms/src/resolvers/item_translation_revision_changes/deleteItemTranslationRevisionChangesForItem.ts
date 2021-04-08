import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationRevisionChangesForItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemTranslationRevisionChangesForItem($id: Int!) {
          delete_item_translation_revision_changes(
            where: { item_translation_revision: { item_id: { _eq: $id } } }
          ) {
            returning {
              id
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

export { deleteItemTranslationRevisionChangesForItem };
