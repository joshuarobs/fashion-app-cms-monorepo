import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemTranslationRevision($id: uuid!) {
          delete_item_translation_revisions_by_pk(id: $id) {
            id
            item_id
            revision
            state
            locale_code
          }
        }
      `,
    });
    return data.data.delete_item_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevision };
