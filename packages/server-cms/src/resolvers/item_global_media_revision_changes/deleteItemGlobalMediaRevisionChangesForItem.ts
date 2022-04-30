import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemGlobalMediaRevisionChangesForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemGlobalMediaRevisionChangesForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemGlobalMediaRevisionChangesForItem($item_id: Int!) {
          delete_item_global_media_revision_changes(
            where: {
              item_global_media_revision: { item_id: { _eq: $item_id } }
            }
          ) {
            returning {
              id
              item_global_media_revision {
                id
              }
            }
          }
        }
      `,
      variables: {
        item_id,
      },
    });
    logger.info(
      `graphql > deleteItemGlobalMediaRevisionChangesForItem() :: Successfully returned data`
    );
    return data.data.delete_item_global_media_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemGlobalMediaRevisionChangesForItem };
