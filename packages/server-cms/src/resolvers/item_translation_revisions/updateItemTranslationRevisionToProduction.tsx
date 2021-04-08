import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateItemTranslationRevisionToProduction() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemTranslationRevisionToProduction($revisionId: uuid!) {
          update_item_translation_revisions_by_pk(
            pk_columns: { id: $revisionId }
            _set: { state: Production }
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

export { updateItemTranslationRevisionToProduction };
