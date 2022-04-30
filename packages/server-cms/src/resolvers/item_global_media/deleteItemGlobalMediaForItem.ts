import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Deletes all the maindata for an item
 * This is used for the Settings tab for the Item page (Delete item)
 * @param item_id
 */
async function deleteItemGlobalMediaForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemGlobalMediaForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemGlobalMediaForItem($item_id: Int!) {
          delete_item_global_media(
            where: { revision: { item_id: { _eq: $item_id } } }
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
      `graphql > deleteItemGlobalMediaForItem() :: Successfully returned data`
    );
    return data.data.delete_item_global_media;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemGlobalMediaForItem };
