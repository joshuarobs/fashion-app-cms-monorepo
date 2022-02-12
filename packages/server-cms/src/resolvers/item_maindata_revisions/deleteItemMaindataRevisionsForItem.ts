import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Deletes all the maindata for an item
// This is used for the Settings tab for the Item page (Delete item)
async function deleteItemMaindataRevisionsForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemMaindataRevisionsForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemMaindataRevisionsForItem($item_id: Int!) {
          delete_item_maindata_revisions(
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
    return data.data.delete_item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemMaindataRevisionsForItem };
