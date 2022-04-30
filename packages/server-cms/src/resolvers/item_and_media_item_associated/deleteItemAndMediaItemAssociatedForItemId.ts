import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

/**
 * Deletes all the `item and media item associated` many-to-many
 * relationship table rows given an item_id.
 * This is used as part of the Settings tab for the Item page (Delete item)
 * @param item_id
 * @param context
 */
async function deleteItemAndMediaItemAssociatedForItemId(
  item_id: number,
  context?: any
) {
  logger.info(
    `graphql > deleteItemAndMediaItemAssociatedForItemId() :: args: item_id: ${item_id} | context: ${JSON.stringify(
      context,
      null,
      2
    )}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemAndMediaItemAssociatedForItemId($item_id: Int!) {
          delete_item_and_media_item_associated(
            where: { item_id: { _eq: $item_id } }
          ) {
            returning {
              item_id
              media_item_id
            }
          }
        }
      `,
      variables: {
        item_id,
      },
    });
    logger.info(
      `graphql > deleteItemAndMediaItemAssociatedForItemId() :: Successfully returned data`
    );
    return data.data.delete_item_and_media_item_associated;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemAndMediaItemAssociatedForItemId };
