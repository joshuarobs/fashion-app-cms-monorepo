import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Deletes all the maindata for an item
// This is used for the Settings tab for the Item page (Delete item)
async function deleteItemGlobalMediaRevisionsForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemGlobalMediaRevisionsForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemGlobalMediaRevisionsForItem($item_id: Int!) {
          delete_item_global_media_revisions(
            where: { item_id: { _eq: $item_id } }
          ) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        item_id,
      },
    });
    logger.info(
      `graphql > deleteItemGlobalMediaRevisionsForItem() :: Successfully returned data`
    );
    return data.data.delete_item_global_media_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemGlobalMediaRevisionsForItem };
