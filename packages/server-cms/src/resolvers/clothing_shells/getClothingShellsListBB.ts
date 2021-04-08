import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getClothingShellsListBB() {
  try {
    const data = await client.query({
      query: gql`
        query getClothingShellsListBB($limit: Int, $offset: Int) {
          clothing_shells(
            order_by: { updated_at: desc }
            limit: $limit
            offset: $offset
          ) {
            id
            updated_at
            counts {
              id
              item_count
            }
          }
        }
      `,
    });
    return data.data.clothing_shells;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getClothingShellsListBB };
