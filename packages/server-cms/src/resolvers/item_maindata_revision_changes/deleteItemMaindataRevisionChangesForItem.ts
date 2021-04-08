import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function deleteItemMaindataRevisionChangesForItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemMaindataRevisionChangesForItem($id: Int!) {
          delete_item_maindata_revision_changes(
            where: { item_maindata_revision: { item_id: { _eq: $id } } }
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
    });
    return data.data.delete_item_maindata_revision_changes;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemMaindataRevisionChangesForItem };
