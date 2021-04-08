import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Deletes all the maindata for an item
// This is used for the Settings tab for the Item page (Delete item)
async function deleteItemMaindataRevisionsForItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemMaindataRevisionsForItem($id: Int!) {
          delete_item_maindata_revisions(where: { item_id: { _eq: $id } }) {
            returning {
              id
            }
          }
        }
      `,
    });
    return data.data.delete_item_maindata_revisions;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemMaindataRevisionsForItem };
