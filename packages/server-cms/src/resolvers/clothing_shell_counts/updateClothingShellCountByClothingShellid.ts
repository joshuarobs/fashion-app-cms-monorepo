import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateClothingShellCountByClothingShellId() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateClothingShellCountByClothingShellId(
          $clothingShellId: Int!
          $changes: clothing_shell_counts_set_input
        ) {
          update_clothing_shell_counts(
            where: { clothing_shell_id: { _eq: $clothingShellId } }
            _set: $changes
          ) {
            returning {
              id
              clothing_shell_id
              item_count
            }
          }
        }
      `,
    });
    return data.data.update_clothing_shell_counts;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingShellCountByClothingShellId };
