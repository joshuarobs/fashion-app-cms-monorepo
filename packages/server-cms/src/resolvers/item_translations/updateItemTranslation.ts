import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateItemTranslation() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemTranslation(
          #    $revisionId: uuid!
          #    $isRelease: Boolean!
          $id: uuid!
          $changes: item_translations_set_input
        ) {
          update_item_translations_by_pk(
            #      pk_columns: { revision_id: $revisionId, is_release: $isRelease }
            pk_columns: { id: $id }
            _set: $changes
          ) {
            id
            revision_id
            is_release
            full_name
            short_name
            description
          }
        }
      `,
    });
    return data.data.update_item_translations_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemTranslation };
