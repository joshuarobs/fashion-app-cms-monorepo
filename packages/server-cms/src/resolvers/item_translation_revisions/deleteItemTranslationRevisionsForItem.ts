import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationRevisionsForItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemTranslationRevisionsForItem($id: Int!) {
          delete_item_translation_revisions(where: { item_id: { _eq: $id } }) {
            returning {
              id
            }
          }
        }
      `,
    });
    return data.data.delete_item_translation_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevisionsForItem };
