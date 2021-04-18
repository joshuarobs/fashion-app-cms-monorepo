import { gql } from '@apollo/client';
import { client } from '../../graphql-client';
import { logger } from '../../logger';

async function updateItemMaindata(id: string, changes: any) {
  try {
    const data = await client.query({
      query: gql`
        mutation updateItemMaindata(
          $id: uuid!
          $changes: item_maindata_set_input
        ) {
          update_item_maindata_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
            name
            short_id
            type
            brand_id
            for_gender
            clothing_shell_id
            clothing_shell {
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
      variables: {
        id,
        changes,
      },
    });
    return data.data.update_item_maindata_by_pk;
  } catch (e) {
    logger.error(e);
    return null;
  }
}

export { updateItemMaindata };
