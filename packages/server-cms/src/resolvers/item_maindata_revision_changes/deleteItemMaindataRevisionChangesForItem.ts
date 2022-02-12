import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemMaindataRevisionChangesForItem(item_id: number) {
  logger.info(
    `graphql > deleteItemMaindataRevisionChangesForItem() :: args: item_id: ${item_id}`
  );

  try {
    const data = await client.mutate({
      mutation: gql`
        mutation deleteItemMaindataRevisionChangesForItem($item_id: Int!) {
          delete_item_maindata_revision_changes(
            where: { item_maindata_revision: { item_id: { _eq: $item_id } } }
          ) {
            returning {
              id
              item_maindata_revision {
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
    return data.data.delete_item_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemMaindataRevisionChangesForItem };
