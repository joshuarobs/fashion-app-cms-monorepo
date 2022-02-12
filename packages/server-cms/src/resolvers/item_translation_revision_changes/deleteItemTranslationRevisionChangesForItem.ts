import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationRevisionChangesForItem(id: number) {
  logger.info(
    `graphql > deleteItemTranslationRevisionChangesForItem() :: args: id: ${id}`
  );
  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemTranslationRevisionChangesForItem($item_id: Int!) {
          delete_item_translation_revision_changes(
            where: { item_translation_revision: { item_id: { _eq: $item_id } } }
          ) {
            returning {
              id
            }
          }
        }
      `,
      variables: { item_id: id },
    });
    return data.data.delete_item_translation_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevisionChangesForItem };
