import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateItemTranslationRevisionToRetired() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemTranslationRevisionToRetired($revisionId: uuid!) {
          update_item_translation_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: Retired }
          ) {
            id
            item_id
            locale_code
            revision
            state
          }
        }
      `,
    });
    return data.data.update_item_translation_revisions_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemTranslationRevisionToRetired };
