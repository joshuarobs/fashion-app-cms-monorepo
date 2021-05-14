import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Updates an Item Translation, alongside updating the Item's `updated_at`
 * field.
 * This is typically used when editing an Item on it's Localisations page.
 * @param id - The id of the maindata
 * @param changes - The changes to make for the maindata (e.g. name change)
 */
async function updateItemTranslation(id: string, changes: any) {
  try {
    const data = await client.mutate({
      mutation: gql`
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
      variables: {
        id,
        changes,
      },
    });
    return data.data.update_item_translations_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemTranslation };
