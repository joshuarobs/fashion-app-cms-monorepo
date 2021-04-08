import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationsForRevision() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemTranslationsForRevision($revisionId: uuid!) {
          delete_item_translations(
            where: { revision_id: { _eq: $revisionId } }
          ) {
            returning {
              id
              is_release
              revision_id
              full_name
              short_name
              description
            }
          }
        }
      `,
    });
    return data.data.delete_item_translations;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationsForRevision };
