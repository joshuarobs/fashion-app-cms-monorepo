import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateClothingShellMaindata() {
  try {
    const data = await client.query({
      query: gql`
        mutation updateClothingShellMaindata(
          $id: uuid!
          $changes: clothing_shell_maindata_set_input
        ) {
          update_clothing_shell_maindata_by_pk(
            pk_columns: { id: $id }
            _set: $changes
          ) {
            id
            name
            uniform_thickness
            default_shell_layer_id
            default_fill_layer_id
            default_lining_layer_id
            default_interlining_layer_id
            item_type
            clothing_segment_data_id
            clothing_segment_data {
              id
              #items_aggregate {
              #  aggregate {
              #    count
              #  }
              #}
            }
          }
        }
      `,
    });
    return data.data.update_clothing_shell_maindata_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateClothingShellMaindata };
