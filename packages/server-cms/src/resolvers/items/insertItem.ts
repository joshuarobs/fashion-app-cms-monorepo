import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function newItem() {
  try {
    const data = await client.query({
      query: gql`
        mutation newItem {
          insert_items_one(object: {}) {
            id
            created_at
            updated_at
          }
        }
      `,
    });
    return data.data.insert_items_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { newItem };
