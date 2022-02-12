import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationsForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemTranslationsForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemTranslationsForItem($item_id: Int!) {
          delete_item_translations(
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
    return data.data.delete_item_translations;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationsForItem };
