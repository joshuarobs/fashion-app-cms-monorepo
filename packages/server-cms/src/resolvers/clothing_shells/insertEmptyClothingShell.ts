import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertEmptyClothingShell() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertEmptyClothingShell {
          insert_clothing_shells_one(object: {}) {
            id
            created_at
            updated_at
          }
        }
      `,
    });
    return data.data.insert_clothing_shells_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertEmptyClothingShell };
