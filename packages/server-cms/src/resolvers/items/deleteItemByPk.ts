import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

// Deletes an item entry by primary key
// This should only be used after every other item maindata revision,
// translations, activity logs, permission matrices, etc. are all deleted
// Otherwise it won't work
async function deleteItemByPk() {
  try {
    const data = await client.query({
      query: gql`
        mutation deleteItemByPk($id: Int!) {
          delete_items_by_pk(id: $id) {
            id
          }
        }
      `,
    });
    return data.data.delete_items_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { deleteItemByPk };
