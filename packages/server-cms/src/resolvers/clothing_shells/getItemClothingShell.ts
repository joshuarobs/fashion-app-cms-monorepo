import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function getItemClothingShell() {
  try {
    const data = await client.query({
      query: gql`
        query getItemClothingShell($id: Int!) {
          clothing_shells_by_pk(id: $id) {
            id
            #name
            #items_aggregate {
            #  aggregate {
            #    count
            #  }
            #}
            counts {
              id
              item_count
            }
            #default_shell_layer_id
            #default_fill_layer_id
            #default_interlining_layer_id
            #default_lining_layer_id
            created_at
            updated_at
          }
        }
      `,
    });
    return data.data.clothing_shells_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { getItemClothingShell };
