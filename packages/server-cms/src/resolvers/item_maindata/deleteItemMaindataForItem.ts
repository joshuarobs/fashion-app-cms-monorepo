import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Deletes all the maindata for an item
// This is used for the Settings tab for the Item page (Delete item)
async function deleteItemMaindataForItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemMaindataForItem($id: Int!) {
          delete_item_maindata(where: { revision: { item_id: { _eq: $id } } }) {
            returning {
              id
            }
          }
        }
      `,
    });
    return data.data.delete_item_maindata;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemMaindataForItem };
