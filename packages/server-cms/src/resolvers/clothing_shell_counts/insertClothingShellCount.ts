import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function insertClothingShellCount() {
  try {
    const data = await client.query({
      query: gql`
        mutation insertClothingShellCount($clothingShellId: Int!) {
          insert_clothing_shell_counts_one(
            object: { clothing_shell_id: $clothingShellId }
          ) {
            id
            clothing_shell_id
            item_count
          }
        }
      `,
    });
    return data.data.insert_clothing_shell_counts_one;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { insertClothingShellCount };
