import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateClothingShellCount() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateClothingShellCount(
          $id: Int!
          $changes: clothing_shell_counts_set_input
        ) {
          update_clothing_shell_counts_by_pk(
            pk_columns: { id: $id }
            _set: $changes
          ) {
            id
            clothing_shell_id
            item_count
          }
        }
      `,
    });
    return data.data.update_clothing_shell_counts_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingShellCount };
