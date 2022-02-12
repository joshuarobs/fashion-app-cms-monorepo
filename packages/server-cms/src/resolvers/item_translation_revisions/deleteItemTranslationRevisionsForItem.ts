import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemTranslationRevisionsForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemTranslationRevisionsForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemTranslationRevisionsForItem($item_id: Int!) {
          delete_item_translation_revisions(
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
    return data.data.delete_item_translation_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemTranslationRevisionsForItem };
