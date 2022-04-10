import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertItemAndMediaItemAssociatedOne(
  item_id: number,
  media_item_id: string,
  context: any,
  loggerPrefix = ''
) {
  logger.info(
    `${loggerPrefix}graphql > insertItemAndMediaItemAssociatedOne() :: args: item_id: ${item_id} | media_item_id: ${media_item_id} | context: ${context}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation insertItemAndMediaItemAssociatedOne(
          $item_id: Int!
          $media_item_id: uuid!
        ) {
          insert_item_and_media_item_associated_one(
            object: { item_id: $item_id, media_item_id: $media_item_id }
          ) {
            media_item_id
            item_id
          }
        }
      `,
      variables: {
        item_id,
        media_item_id,
      },
    });

    /*
     * ============================================================
     * Return the result
     * ============================================================
     */
    logger.info(
      `${loggerPrefix}graphql > insertItemAndMediaItemAssociatedOne() :: Successfully returned data`
    );
    return data.data.insert_item_and_media_item_associated_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertItemAndMediaItemAssociatedOne };
